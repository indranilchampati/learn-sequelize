const { Product } = require("../models");
const logger = require("../util/logger");

const fs = require("fs");
const path = require("path");

const upsertProducts = async () => {
  try {
    const filePath = path.join(__dirname, "../dummyProducts.json");
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const filteredData = data.filter(
      (product) => product.name && product.price
    ); // Null checks
    if (filteredData.length === 0) {
      logger.warn("No valid products to upsert.");
    }

    await Product.bulkCreate(filteredData, {
      updateOnDuplicate: ["name", "price"],
    });
  } catch (error) {
    logger.error("Error upserting products: ", error);
    throw error;
  }
};

const getProducts = async () => {
  try {
    return await Product.findAll({
      attributes: ["id", "name"],
    });
  } catch (error) {
    logger.error("Error fetching products: ", error);
    throw error;
  }
};

const getProductById = async (productId) => {
  try {
    return await Product.findOne({
      where: { id: productId },
    });
  } catch (error) {
    logger.error(`Error fetching product with ID ${productId}: `, error);
    throw error;
  }
};

module.exports = {
  upsertProducts,
  getProducts,
  getProductById,
};
