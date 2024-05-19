const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./common/middlewares/errorHandler");
const logger = require("./common/utils/Logger");
const paymentRouter = require("./routes/payment.routes");
const config = require("./config/config");

const app = express();
const port = config.PAYMENT_PORT || 3030;

app.use(logger.infoLogger);

app.use(bodyParser.json());

const baseApiUrl = `/v${config.PAYMENT_API_VERSION}`;

app.use(`${baseApiUrl}/paymentGateway`, paymentRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
