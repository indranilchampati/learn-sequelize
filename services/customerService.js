const { Customer } = require("../models");
const logger = require("../util/logger");

const getAllCustomers = async () => {
  logger.info("Fetching all customers");
  try {
    return await Customer.findAll();
  } catch (error) {
    logger.error(`Error fetching customers: ${error.message}`);
    throw error;
  }
};

const createCustomer = async (customerData) => {
  logger.info("Creating a new customer");
  try {
    const newCustomer = await Customer.create(customerData);
    return newCustomer;
  } catch (error) {
    logger.error(`Error creating customer: ${error.message}`);
    throw error;
  }
};

const updateCustomer = async (customerId, customerData) => {
  logger.info(`Updating customer with ID: ${customerId}`);
  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) throw new Error("Customer not found");
    await customer.update(customerData);
    return customer;
  } catch (error) {
    logger.error(`Error updating customer: ${error.message}`);
    throw error;
  }
};

const deleteCustomer = async (customerId) => {
  logger.info(`Deleting customer with ID: ${customerId}`);
  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) throw new Error("Customer not found");
    await customer.destroy();
    return { message: "Customer deleted successfully" };
  } catch (error) {
    logger.error(`Error deleting customer: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
