require("dotenv").config();
const path = require("path");
const Umzug = require("umzug");
const { sequelize } = require("../../models");

async function loadMigrations() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  const umzug = new Umzug({
    migrations: {
      path: path.join(__dirname, "../../migrations"),
      params: [
        sequelize.getQueryInterface(), // queryInterface
        sequelize.constructor, // DataTypes
      ],
    },
    storage: "sequelize",
    storageOptions: {
      sequelize: sequelize,
    },
  });

  // Executes all pending migrations
  try {
    await umzug.up();
    console.log("Migrations have been run successfully.");
  } catch (error) {
    console.error("An error occurred while running migrations:", error);
  }
}

module.exports = loadMigrations;
