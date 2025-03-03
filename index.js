const sequelize = require("./util/database");

const Customer = require("./models/customer");
const Order = require("./models/order");

Customer.hasMany(Order);

let customerId = null;
(async () => {
  try {
    await sequelize.sync({force: true});
    const result = await Customer.create({name: "Indranil Champati", email: "indranil@gmail.com"});
    console.log(result);
    
    customerId = result.id;
    const order = await result.createOrder({total: 45});
    console.log("Order is : ", order);
    
    const orders = await Order.findAll({ where: { customerId } });
    console.log("Completed Orders : ", orders);
  } catch (err) {
    console.log(err);
  }
})();
