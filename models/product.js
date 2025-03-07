const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: "Price must be a valid number." },
      min: { args: [0], msg: "Price must be a positive value." }, 
    },

    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Product;
