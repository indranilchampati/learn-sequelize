const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  sequelize,
  Customer,
  Product,
  Order,
  OrderLineItem,
} = require("./models");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/test-db", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ message: "Database connection successful" });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.post("/products", async (req, res) => {
  console.log("Incoming request body:", req.body);
  try {
    const { name, price, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    const product = await Product.create({ name, price, description });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: OrderLineItem, as: "order_line_items" }],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

app.post("/orders", async (req, res) => {
  try {
    console.log("Incoming Order Data:", req.body);
    const { customer_id, product_id, quantity } = req.body;

    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const customer = await Customer.findByPk(customer_id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    const order = await Order.create({
      customer_id,
      customer_name: customer.name,
      order_date: new Date(),
      product_name: product.name,
      total: product.price * quantity,
    });

    await OrderLineItem.create({
      product_name: product.name,

      order_id: order.id,
      product_id,
      quantity,
      price: product.price,
      total_price: product.price * quantity,
    });

    res.json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ error: "Failed to create order", details: error.message });
  }
});

const PORT = 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
