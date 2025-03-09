const {
  sequelize,
  Customer,
  Order,
  OrderLineItem,
  OrderPayment,
  CustomerOrder,
} = require("./models");
const productService = require("./services/productService");
const orderService = require("./services/orderService");
const fs = require("fs");
const path = require("path");

const readCustomersFromFile = () => {
  const filePath = path.join(__dirname, "dummyCustomers.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const readProductsFromFile = () => {
  const filePath = path.join(__dirname, "dummyProducts.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

(async () => {
  try {
    console.log("Starting database sync...");
    await sequelize.sync({ force: true });
    console.log("Database sync completed!");

    console.log("Reading products from file...");
    const products = readProductsFromFile();
    console.log("Products loaded:", products);

    console.log("Upserting products...");
    await productService.upsertProducts(products);
    console.log("Products upserted successfully!");

    console.log("Reading customers from file...");
    const customers = readCustomersFromFile();
    console.log("Customers loaded:", customers);

    console.log("Inserting customers into the database...");
    const createdCustomers = await Customer.bulkCreate(customers, {
      returning: true,
    });
    console.log("Customers inserted successfully!");

    let ordersData = [];
    let orderLineItemsData = [];
    let customerOrdersData = [];
    let orderPaymentsData = [];

    console.log("Preparing order data...");
    createdCustomers.forEach((customer) => {
      const orderEntries = products.map((product) => {
        return {
          customer_id: customer.id,
          order_date: new Date(),
          customer_name: customer.name,
          product_name: product.name,
          quantity: 1,
          price: product.price,
          total_price: product.price * 1,
        };
      });

      ordersData.push(...orderEntries);
    });
    console.log("Order data prepared:", ordersData);

    console.log("Bulk inserting orders...");
    const createdOrders = await Order.bulkCreate(ordersData, {
      returning: true,
    });
    console.log("Orders inserted successfully!");

    console.log("Preparing related order details...");
    createdOrders.forEach((order) => {
      const productData = products.find((p) => p.name === order.product_name);

      customerOrdersData.push({
        customer_id: order.customer_id,
        order_id: order.id,
        product_id: productData.id,
        product_name: productData.name,
      });

      orderLineItemsData.push({
        order_id: order.id,
        product_id: productData.id,
        quantity: 1,
        product_name: productData.name,
        price: productData.price,
        total_price: productData.price * 1,
      });

      orderPaymentsData.push({
        order_id: order.id,
        amount: productData.price,
        payment_date: new Date(),
      });
    });

    await sequelize.transaction(async (t) => {
      console.log("Bulk inserting customer orders...");
      await CustomerOrder.bulkCreate(customerOrdersData, { transaction: t });
      console.log("Customer orders inserted successfully!");

      console.log("Bulk inserting order line items...");
      await OrderLineItem.bulkCreate(orderLineItemsData, { transaction: t });
      console.log("Order line items inserted successfully!");

      console.log("Bulk inserting order payments...");
      await OrderPayment.bulkCreate(orderPaymentsData, { transaction: t });
      console.log("Order payments inserted successfully!", orderPaymentsData);
    });

    console.log("All bulk operations completed successfully!");
  } catch (err) {
    console.error("Error occurred:", err);
  }
})();
