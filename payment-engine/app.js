require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./common/middlewares/errorHandler");
const logger = require("./common/utils/Logger");
const transactionsRouter = require("./routes/transaction.routes");
const webhookRouter = require("./routes/webhook.routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(logger.infoLogger);

app.use(bodyParser.json());

const baseApiUrl = `/v${process.env.API_VERSION}`;

app.use(`${baseApiUrl}/transactions`, transactionsRouter);
app.use(`${baseApiUrl}/webhook`, webhookRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
