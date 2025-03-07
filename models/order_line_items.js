const { DataTypes } = require("sequelize");
const dbSequelize = require("../util/database");

const OrderLineItem = dbSequelize.define("order_line_items", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "Order ID must be an integer." },
      min: { args: [1], msg: "Order ID must be a positive integer." },
    },

    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "Product ID must be an integer." },
      min: { args: [1], msg: "Product ID must be a positive integer." },
    },

    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "Quantity must be an integer." },
      min: { args: [1], msg: "Quantity must be at least 1." },
    },

    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

OrderLineItem.associate = (models) => {
  OrderLineItem.belongsTo(models.Order, { foreignKey: "order_id" });
  OrderLineItem.belongsTo(models.Product, { foreignKey: "product_id" });
};

module.exports = OrderLineItem;
