const { sequelize } = require("./models");
const productService = require("./services/productService");
const orderService = require("./services/orderService");
const customerService = require("./services/customerService");
const fs = require("fs");
const path = require("path");
const logger = require("./util/logger");

const readFileData = (filePath) => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, filePath), "utf8"));
};

(async () => {
  try {
    logger.info("Starting database sync...");
    await sequelize.sync({ force: true });
    logger.info("Database sync completed!");

    logger.info("Reading products from file...");
    const products = readFileData("dummyProducts.json");

    logger.info("Upserting products...");
    await productService.upsertProducts(products);
    logger.info("Products upserted successfully!");

    logger.info("Reading customers from file...");
    const customers = readFileData("dummyCustomers.json");

    logger.info("Inserting customers into the database...");
    const createdCustomers = await customerService.insertCustomers(customers);
    logger.info("Customers inserted successfully!");

    logger.info("Generating and inserting orders...");
    await orderService.generateAndInsertOrders(createdCustomers, products);
    logger.info("All orders and related records inserted successfully!");
  } catch (err) {
    logger.error("Error occurred:", err);
  }
})();
