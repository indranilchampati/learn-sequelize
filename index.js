const sequelize = require("./util/database");

const Customer = require("./models/customer");
const Order = require("./models/order");

Customer.hasMany(Order);

let customerId = null;
sequelize
  .sync({force: true})
  .then((result) => {
    return Customer.create({name: "Indranil Champati", email: "indranil@gmail.com"})
    console.log(result);
  })
  .then(customer => {
    customerId = customer.id;
    return customer.createOrder({total: 45});
  })
  .then(order => {
    console.log("Order is : ",order);
    return Order.findAll({ where: customerId});
  })
  .then(orders => {
    console.log("Completed Orders : ",orders);
  })
  .catch((err) => {
    console.log(err);
  });
