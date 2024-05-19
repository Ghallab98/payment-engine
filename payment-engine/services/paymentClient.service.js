const config = require("../config/config");
const retry = require("../common/utils/retry");
const fetch = require("node-fetch");
class PaymentClientService {
  constructor(url) {
    this.url = url;
  }
  initiatePayment = (paymentRequest) =>
    retry(async () => {
      const apiKey = config[`API_KEY_${paymentRequest.gateway.toUpperCase()}`];
      const payload = {
        ...paymentRequest,
        apiKey,
      };
      const paymentResult = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return paymentResult;
    });
}

module.exports = new PaymentClientService(
  `http://${config.PAYMENT_HOST}:${config.PAYMENT_PORT}/v${config.PAYMENT_API_VERSION}/paymentGateway/payment`
);
