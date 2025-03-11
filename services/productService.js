const { Product } = require("../models");
const logger = require("../util/logger");

const getProductById = async (id) => {
  logger.info(`Fetching product with ID: ${id}`);
  return await Product.findByPk(id);
};

const getAllProducts = async () => {
  logger.info("Fetching all products");
  return await Product.findAll();
};

const createProduct = async ({ name, price, description }) => {
  logger.info(`Creating product: ${name}`);
  return await Product.create({ name, price, description });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
