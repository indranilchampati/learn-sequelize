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
    validate: {
      isInt: { msg: "Order ID must be an integer." },
      min: { args: [1], msg: "Order ID must be a positive integer." },
    },

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
    validate: {
      isDecimal: { msg: "Amount must be a valid decimal." },
      min: { args: [0], msg: "Amount must be a positive value." },
    },

    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

OrderPayment.associate = (models) => {
  OrderPayment.belongsTo(models.Order, { foreignKey: "order_id" });
};

module.exports = OrderPayment;
