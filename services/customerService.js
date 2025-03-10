const { Customer } = require("../models");
const logger = require("../util/logger");

const insertCustomers = async (customers) => {
  logger.info("in CS file HEREEE");
  console.log(customers);

  try {
    return await Customer.bulkCreate(customers, { returning: true });
  } catch (error) {
    logger.error("Error inserting customers ", error);
    throw new Error("Failed to insert customers");
  }
};

module.exports = {
  insertCustomers,
};
