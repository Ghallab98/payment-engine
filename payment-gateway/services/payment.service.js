const notificationService = require("./notification.service");

class PaymentService {
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  generateStatus = () => (Math.random() < 0.5 ? "successful" : "declined");

  processPayment = async ({ transactionId }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const status = this.generateStatus();

    const payload = {
      transactionId,
      status,
    };

    return this.notificationService.sendTransactionStatus(payload);
  };
}

module.exports = new PaymentService(notificationService);
