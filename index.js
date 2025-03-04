const { sequelize, Customer, Order, Product, OrderLineItem, OrderPayment, CustomerOrder } = require("./models");

(async () => {
  try {
    await sequelize.sync({ force: true }); // Use force: true for development only

    // Create test data
    const customer = await Customer.create({
      name: "Indranil Champati",
      email: "indranil@gmail.com",
    });

    const order = await Order.create({
      customer_id: customer.id,
      order_date: new Date(),
    });

    const product = await Product.create({
      name: "Sample Product",
      price: 19.99,
    });

    const orderLineItem = await OrderLineItem.create({
      order_id: order.id,
      product_id: product.id,
      quantity: 2,
      price: product.price,
    });

    const orderPayment = await OrderPayment.create({
      order_id: order.id,
      payment_date: new Date(),
      amount: orderLineItem.quantity * orderLineItem.price,
    });

    const customerOrder = await CustomerOrder.create({
      customer_id: customer.id,
      order_id: order.id,
    });

    console.log("Customer order created:", customerOrder.toJSON());

    const orders = await Order.findAll({
      where: { customer_id: customer.id },
      include: [
        { model: OrderLineItem, as: "order_line_items", include: [Product] },
        { model: OrderPayment, as: "order_payments" },
      ],
    });

    console.log("Completed Orders:", JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
})();
