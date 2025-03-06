const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Order = sequelize.define("order", {
  customerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "customers", // refers to the Customer model
      key: "id", // refers to the id field in the Customer model
    },
  },

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Order;
