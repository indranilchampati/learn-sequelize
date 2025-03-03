const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

/**
 * Customer model
 */
const Customer = sequelize.define("customers", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  /**
   * Name of the customer.
   */
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Customer.associate = (models) => {
  Customer.hasMany(models.Order, { foreignKey: "customer_id", as: "customer_orders_list" });
  Customer.belongsToMany(models.Order, {
    through: models.CustomerOrder,
    foreignKey: "customer_id",
    otherKey: "order_id",
    as: "customer_orders_many",
  });
};

module.exports = Customer;
