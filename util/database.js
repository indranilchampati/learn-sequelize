const Sequelize = require("sequelize");

const sequelize = new Sequelize("ks-store", "root", "9823117083", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
