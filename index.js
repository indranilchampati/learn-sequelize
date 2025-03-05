const { sequelize, Customer, Order, Product, OrderLineItem, OrderPayment, CustomerOrder } = require("./models");
const productService = require('./services/productService');
const orderService = require('./services/orderService');
const fs = require('fs');
const path = require('path');


const readCustomersFromFile = () => {
    const filePath = path.join(__dirname, 'dummyCustomers.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};


const readProductsFromFile = () => {
    const filePath = path.join(__dirname, 'dummyProducts.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

(async () => {
    try {
        await sequelize.sync({ force: true });

        const products = readProductsFromFile();
        await productService.upsertProducts(products);

        const customers = readCustomersFromFile();
        console.log("Customers Array:", customers);

        for (const customerData of customers) {
            const customer = await Customer.create(customerData);
            console.log("Created Customer:", customer.toJSON(), "Email:", customerData.email);

            console.log("Customer ID:", customer.id);

            const orders = await orderService.getOrdersWithDetails(customer.id);
            console.log("Completed Orders for Customer ID:", customer.id, JSON.stringify(orders, null, 2));

            for (const productData of products) {
                const [product] = await Product.upsert({
                    id: productData.id,
                    name: productData.name,
                    price: productData.price,
                    description: productData.description || '',
                });


                const order = await Order.create({
                    customer_id: customer.id,
                    order_date: new Date(),
                    customer_name: customerData.name,
                    product_name: productData.name,
                });





                const existingOrder = await CustomerOrder.findOne({
                    where: {
                        customer_id: customer.id,
                        order_id: order.id,
                    },
                });

                if (!existingOrder) {
                    const customerOrder = await CustomerOrder.create({
                        customer_id: customer.id,
                        order_id: order.id,
                        product_id: product.id,
                        product_name: productData.name,
                    });
                    console.log("Customer order created:", customerOrder.toJSON());
                }
            }
        }


    } catch (err) {
        console.error("Error:", err);
    }
})();
