const express = require("express");
const router = express.Router();
const productService = require("../services/productService");

router.get("/", async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newProduct = await productService.createProduct({
      name,
      price,
      description,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

module.exports = router;
