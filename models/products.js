const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define("products", {
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
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Define associations
Product.associate = (models) => {
  Product.hasMany(models.OrderLineItem, { foreignKey: "product_id" });
};

module.exports = Product;
