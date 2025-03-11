const {
  Order,
  OrderLineItem,
  OrderPayment,
  CustomerOrder,
} = require("../models");
const sequelize = require("../models").sequelize;
const logger = require("../util/logger");

const descriptions = ["Fast delivery", "Limited edition", "Best seller"];

const getRandomDescription = () => {
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const generateAndInsertOrders = async (customers, products) => {
  logger.info("Preparing order data...");

  const productMap = new Map(products.map((p) => [p.name, p]));

  const {
    ordersData,
    customerOrdersData,
    orderLineItemsData,
    orderPaymentsData,
  } = customers.reduce(
    (acc, customer) => {
      const orders = products.map((product) => ({
        customer_id: customer.id,
        order_date: new Date(),
        customer_name: customer.name,
        product_name: product.name,
        quantity: 1,
        price: product.price,
        total_price: product.price * 1,
      }));

      acc.ordersData.push(...orders);
      return acc;
    },
    {
      ordersData: [],
      customerOrdersData: [],
      orderLineItemsData: [],
      orderPaymentsData: [],
    }
  );

  logger.info("Bulk inserting orders...");
  const createdOrders = await Order.bulkCreate(ordersData, { returning: true });

  logger.info("Preparing related order details...");
  createdOrders.reduce(
    (acc, order) => {
      const productData = productMap.get(order.product_name);
      const customerData = customers.find((c) => c.id === order.customer_id);
      if (!productData || !customerData) return acc;

      acc.customerOrdersData.push({
        customer_id: order.customer_id,
        order_id: order.id,
        product_id: productData.id,
        product_name: productData.name,
        customername: customerData.name,
      });

      acc.orderLineItemsData.push({
        description: getRandomDescription(), // trying to use random

        order_id: order.id,
        product_id: productData.id,
        quantity: 1,
        product_name: productData.name,
        price: productData.price,
        total_price: productData.price * 1,
      });

      acc.orderPaymentsData.push({
        order_id: order.id,
        amount: productData.price * 1,

        payment_date: new Date(),
        quantity: order.quantity,
      });

      return acc;
    },
    { customerOrdersData, orderLineItemsData, orderPaymentsData }
  );

  logger.info("Performing bulk inserts within a transaction...");
  await sequelize.transaction(async (t) => {
    await Promise.all([
      CustomerOrder.bulkCreate(customerOrdersData, { transaction: t }),
      OrderLineItem.bulkCreate(orderLineItemsData, { transaction: t }),
      OrderPayment.bulkCreate(orderPaymentsData, { transaction: t }),
    ]);
  });

  logger.info("All order-related records inserted successfully!");
};

module.exports = { generateAndInsertOrders };
