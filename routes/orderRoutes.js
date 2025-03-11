const express = require("express");
const router = express.Router();
const orderService = require("../services/orderService");

router.get("/", async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { customer_id, product_id, quantity } = req.body;
    const newOrder = await orderService.createOrder({
      customer_id,
      product_id,
      quantity,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
