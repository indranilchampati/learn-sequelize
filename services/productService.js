const { Product } = require("../models");
const fs = require("fs");
const path = require("path");

const upsertProducts = async () => {
  const filePath = path.join(__dirname, "../dummyProducts.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const filteredData = data.filter((product) => product.name && product.price); // Null checks

  await Product.bulkCreate(filteredData, {
    updateOnDuplicate: ["name", "price"],
  });
};


const getProducts = async () => {
  return await Product.findAll({
    attributes: ["id", "name"],
  });
};

const getProductById = async (productId) => {
  return await Product.findOne({
    where: { id: productId },
  });
};

module.exports = {
  upsertProducts,
  getProducts,
  getProductById,
};
