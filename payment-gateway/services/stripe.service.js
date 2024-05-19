const notificationService = require("./notification.service");
const PaymentService = require("./payment.service");

class StripeService extends PaymentService {
  constructor(notificationService) {
    super();
    this.notificationService = notificationService;
  }

  generateStatus = () => (Math.random() < 0.6 ? "successful" : "declined");

  processPayment = async ({ transactionId }) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const status = this.generateStatus();

    const payload = {
      transactionId,
      status,
    };

    return this.notificationService.sendTransactionStatus(payload);
  };
}

module.exports = new StripeService(notificationService);
