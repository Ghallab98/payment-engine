const webhookService = require("./webhook.service");

class PaymentService {
  constructor(webhookService) {
    this.webhookService = webhookService;
  }

  generateStatus = () => (Math.random() < 0.5 ? "successful" : "declined");

  processPayment = async ({ transactionId }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const status = this.generateStatus();

    const payload = {
      transactionId,
      status,
    };

    return this.webhookService.sendTransactionStatus(payload);
  };
}

module.exports = new PaymentService(webhookService);
