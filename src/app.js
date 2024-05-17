require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const errorHandler = require("./utils/errorHandler");
const { winstonInfo } = require("../config/winston");
const transactionsRouter = require("./routes/transaction.routes");
const webhookRouter = require("./routes/webhook.routes");
const paymentGatewayRouter = require("./routes/paymentGateway.routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("combined", { stream: winstonInfo.stream }));

app.use(bodyParser.json());

const baseApiUrl = `/v${process.env.API_VERSION}`;

app.use(`${baseApiUrl}/transactions`, transactionsRouter);
app.use(`${baseApiUrl}/paymentGateway`, paymentGatewayRouter);
app.use(`${baseApiUrl}/webhook`, webhookRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
