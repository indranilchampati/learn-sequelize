const { Order, OrderLineItem, Customer, Product } = require("../models");
const logger = require("../util/logger");

const createOrder = async (orderData) => {
  logger.info("Creating a new order");
  const { customer_id, product_id, quantity } = orderData;

  try {
    const product = await Product.findByPk(product_id);
    if (!product) throw new Error("Product not found");

    const customer = await Customer.findByPk(customer_id);
    if (!customer) throw new Error("Customer not found");

    const order = await Order.create({
      customer_id,
      customer_name: customer.name,
      order_date: new Date(),
      product_name: product.name,
      total: product.price * quantity,
    });

    await OrderLineItem.create({
      product_name: product.name,
      order_id: order.id,
      product_id,
      quantity,
      price: product.price,
      total_price: product.price * quantity,
    });

    return order;
  } catch (error) {
    logger.error(`Error creating order: ${error.message}`);
    throw error;
  }
};

const getAllOrders = async () => {
  logger.info("Fetching all orders");
  return await Order.findAll({
    include: [{ model: OrderLineItem, as: "order_line_items" }],
  });
};

module.exports = {
  getAllOrders,
  createOrder,
};
