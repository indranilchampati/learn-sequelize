const Sequelize = require("sequelize");

const sequelize = new Sequelize("icc", "root", "admin123", {
  dialect: "mysql",
  host: "127.0.0.1",
});

module.exports = sequelize;
