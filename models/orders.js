const { DataTypes } = require("sequelize");
const dbSequelize = require("../util/database");

const Order = dbSequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "Customer ID must be an integer." },
      min: { args: [1], msg: "Customer ID must be a positive integer." },
    },
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: "Order date must be a valid date." },
    },
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Order.associate = (models) => {
  Order.hasMany(models.OrderLineItem, {
    foreignKey: "order_id",
    as: "order_line_items",
  });
  Order.hasMany(models.OrderPayment, {
    foreignKey: "order_id",
    as: "order_payments",
  });
};

module.exports = Order;
