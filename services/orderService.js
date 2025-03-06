const { Order, OrderLineItem, CustomerOrder } = require("../models");
const sequelize = require("sequelize");

const updateOrder = async (orderId, updateData) => {
  return await Order.update(updateData, {
    where: { id: orderId },
  });
};

const deleteOrder = async (orderId) => {
  return await Order.destroy({
    where: { id: orderId },
  });
};

const getOrdersWithDetails = async (customerId) => {
  return await Order.findAll({
    where: { customer_id: customerId },
    include: [
      {
        model: OrderLineItem,
        as: "order_line_items",
        attributes: ["id", "quantity"],
      },
    ],
  });
};

const getGroupedOrders = async () => {
  return await Order.findAll({
    attributes: [
      "customer_id",
      [sequelize.fn("COUNT", sequelize.col("id")), "orderCount"],
    ],
    group: ["customer_id"],
    order: [[sequelize.fn("COUNT", sequelize.col("id")), "DESC"]],
  });
};

const addProductToOrder = async (customerId, orderId, products) => {
  const customerOrderData = products.map((product) => ({
    customer_id: customerId,
    order_id: orderId,
    product_id: product.id,
    product_name: product.name,
  }));

  return await CustomerOrder.bulkCreate(customerOrderData);
};


module.exports = {
  updateOrder,
  deleteOrder,
  getOrdersWithDetails,
  getGroupedOrders,
  addProductToOrder,
};
