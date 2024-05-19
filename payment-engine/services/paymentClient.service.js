const config = require("../config/config");
class PaymentClientService {
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
      return paymentResult.json();
    });
}

module.exports = new PaymentClientService();
