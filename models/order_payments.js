const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const OrderPayment = sequelize.define("order_payments", {
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
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Define associations
OrderPayment.associate = (models) => {
  OrderPayment.belongsTo(models.Order, { foreignKey: 'order_id' });
};

module.exports = OrderPayment;
