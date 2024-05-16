require("dotenv").config();
const Sequelize = require("sequelize");

const databaseParams =
  process.env.NODE_ENV.trim() === "test"
    ? {
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        host: process.env.TEST_DB_HOSTNAME,
        port: process.env.TEST_DB_PORT,
      }
    : {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
      };

// Database configuration
const sequelize = new Sequelize({
  dialect: "postgres", // Database dialect
  host: databaseParams.host, // Database host
  port: databaseParams.port, // Database port
  username: databaseParams.username, // Database username
  password: databaseParams.password, // Database password
  database: databaseParams.database, // Database name
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
