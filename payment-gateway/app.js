require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler");
const morgan = require("morgan");
const { winstonInfo } = require("./config/winston");
const paymentRouter = require("./routes/payment.routes");

const app = express();
const port = process.env.PAYMENT_PORT || 3030;

app.use(morgan("combined", { stream: winstonInfo.stream }));

app.use(bodyParser.json());

const baseApiUrl = `/v${process.env.PAYMENT_API_VERSION}`;

app.use(`${baseApiUrl}/paymentGateway`, paymentRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
