const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const OrderLineItem = sequelize.define("order_line_items", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

OrderLineItem.associate = (models) => {
  OrderLineItem.belongsTo(models.Order, { foreignKey: 'order_id' });
  OrderLineItem.belongsTo(models.Product, { foreignKey: 'product_id' });
};

module.exports = OrderLineItem;
