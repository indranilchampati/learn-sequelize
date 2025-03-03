const Customer = require("./customer");
const Order = require("./orders");
const Product = require("./products");
const OrderLineItem = require("./order_line_items");
const OrderPayment = require("./order_payments");
const CustomerOrder = require("./customer_orders");
const sequelize = require("../util/database");

const models = {
  Customer,
  Order,
  Product,
  OrderLineItem,
  OrderPayment,
  CustomerOrder,
};

// Call associate methods
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models,
};
