require("dotenv").config();

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

module.exports = {
  ...databaseParams,
  dialect: "postgres",
  operatorsAliases: "0",
  define: {
    freezeTableName: true,
    underscored: true,
  },
  logging: process.env.DB_LOGGING == "true",
};
