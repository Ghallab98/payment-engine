require("dotenv").config();
const express = require("express");
const errorHandler = require("./utils/errorHandler");
const transactionsRouter = require("./routes/transaction.routes");

const app = express();
const port = process.env.PORT || 3000;

const baseApiUrl = `/v${process.env.API_VERSION}`;

app.use(`${baseApiUrl}/transactions`, transactionsRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
