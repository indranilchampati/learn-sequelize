const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define("Product", {  // Changed to "Product" for consistency
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
  },
});

module.exports = Product;
