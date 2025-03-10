const { Product } = require("../models");
const logger = require("../util/logger");

const upsertProducts = async (products) => {
  if (!products || products.length === 0) {
    logger.warn("No valid products to upsert.");
    return;
  }

  try {
    await Product.bulkCreate(products, {
      updateOnDuplicate: ["name", "price"],
    });
    logger.info("Products upserted successfully!");
  } catch (error) {
    logger.error("Error upserting products: ", error);
    throw new Error("Failed to upsert products");
  }
};

const getProducts = async () => {
  try {
    return await Product.findAll({ attributes: ["id", "name"] });
  } catch (error) {
    logger.error("Error fetching products: ", error);
    throw new Error("Failed to fetch products");
  }
};

const getProductById = async (productId) => {
  try {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) throw new Error(`Product with ID ${productId} not found`);
    return product;
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
