require("dotenv").config();

const { Client } = require("pg");
const loadMigrations = require("./loadMigrations");

async function dropAndCreateDatabase() {
  // Create a new instance of pg client
  const client = new Client({
    host: process.env.TEST_DB_HOSTNAME,
    port: process.env.TEST_DB_PORT,
    user: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: "postgres", // start in default DB
  });

  await client.connect();
  console.log(
    `Client connected to ${process.env.TEST_DB_HOSTNAME} using ${process.env.TEST_DB_USERNAME} on port ${process.env.TEST_DB_PORT} successfully.`
  );

  // Revoke any connections on the database
  const result = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = '${process.env.TEST_DB_NAME}'`
  );
  if (result.rows.length > 0) {
    await client.query(
      `REVOKE CONNECT ON DATABASE ${process.env.TEST_DB_NAME} FROM public; SELECT pid, pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = \'${process.env.TEST_DB_NAME}\' AND pid <> pg_backend_pid();`
    );
    console.log("Database connections revoked successfully.");
  } else {
    console.log("Database does not exist.");
  }

  // Drop the database
  await client.query(`DROP DATABASE IF EXISTS ${process.env.TEST_DB_NAME};`);
  console.log("Database dropped successfully.");

  // Create the database
  await client.query(`CREATE DATABASE ${process.env.TEST_DB_NAME};`);
  console.log("Database created successfully.");

  // Close the client connection
  await client.end();
  console.log("Connection closed.");
}

async function initializeDB() {
  try {
    await dropAndCreateDatabase();
    await loadMigrations();
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

module.exports = async () => {
  await initializeDB();
};
