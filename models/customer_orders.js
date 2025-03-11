const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");
const logger = require("../util/logger");

const CustomerOrder = sequelize.define("customer_orders", {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customername: {
    type: DataTypes.STRING,
    allowNull: false, // Assuming the customer name is required
  },
});

CustomerOrder.beforeCreate(() =>
  logger.info("Creating new CustomerOrder instance")
);
CustomerOrder.afterCreate(() =>
  logger.info("CustomerOrder instance created successfully")
);
CustomerOrder.beforeUpdate(() =>
  logger.info("Updating CustomerOrder instance")
);
CustomerOrder.afterUpdate(() =>
  logger.info("CustomerOrder instance updated successfully")
);
CustomerOrder.beforeDestroy(() =>
  logger.info("Deleting CustomerOrder instance")
);
CustomerOrder.afterDestroy(() =>
  logger.info("CustomerOrder instance deleted successfully")
);

module.exports = CustomerOrder;
