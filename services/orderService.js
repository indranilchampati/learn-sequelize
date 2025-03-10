const {
  Order,
  OrderLineItem,
  OrderPayment,
  CustomerOrder,
} = require("../models");
const sequelize = require("../models").sequelize;
const logger = require("../util/logger");

const generateAndInsertOrders = async (customers, products) => {
  let ordersData = [];
  let orderLineItemsData = [];
  let customerOrdersData = [];
  let orderPaymentsData = [];

  logger.info("Preparing order data...");
  customers.forEach((customer) => {
    const orderEntries = products.map((product) => ({
      customer_id: customer.id,
      order_date: new Date(),
      customer_name: customer.name,
      product_name: product.name,
      quantity: 1,
      price: product.price,
      total_price: product.price * 1,
    }));
    ordersData.push(...orderEntries);
  });

  logger.info("Bulk inserting orders...");
  const createdOrders = await Order.bulkCreate(ordersData, { returning: true });

  logger.info("Preparing related order details...");
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

  logger.info("Performing bulk inserts with transaction...");
  await sequelize.transaction(async (t) => {
    await CustomerOrder.bulkCreate(customerOrdersData, { transaction: t });
    await OrderLineItem.bulkCreate(orderLineItemsData, { transaction: t });
    await OrderPayment.bulkCreate(orderPaymentsData, { transaction: t });
  });

  logger.info("All order-related records inserted successfully!", "till here");
};

module.exports = {
  generateAndInsertOrders,
};
