const notificationService = require("./notification.service");
const PaymentService = require("./payment.service");

class PaypalService extends PaymentService {
  constructor(notificationService) {
    super();
    this.notificationService = notificationService;
  }

  generateStatus = () => (Math.random() < 0.2 ? "successful" : "declined");

  processPayment = async ({ transactionId }) => {
    await new Promise((resolve) => setTimeout(resolve, 8000));
    const status = this.generateStatus();

    const payload = {
      transactionId,
      status,
    };

    return this.notificationService.sendTransactionStatus(payload);
  };
}

module.exports = new PaypalService(notificationService);
