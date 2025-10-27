// sequelize.config.js
require("dotenv").config();
const { Sequelize } = require("sequelize");

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
  }
};
