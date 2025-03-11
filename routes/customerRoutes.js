const express = require("express");
const router = express.Router();
const customerService = require("../services/customerService");

router.get("/", async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCustomer = await customerService.createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: "Failed to create customer" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCustomer = await customerService.updateCustomer(
      req.params.id,
      req.body
    );
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: "Failed to update customer" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await customerService.deleteCustomer(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customer" });
  }
});

module.exports = router;
