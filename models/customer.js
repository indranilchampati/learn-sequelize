const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Order = require("./order"); // Import Order model

const Customer = sequelize.define("customer", {



  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Customer.hasMany(Order, { foreignKey: 'customerId' }); // Establish relationship
Order.belongsTo(Customer, { foreignKey: 'customerId' }); // Establish reverse relationship



module.exports = Customer;
