const transactionService = require("./transaction.service");
class WebhookService {
  constructor(transactionService) {
    this.transactionService = transactionService;
  }

  handlePaymentEvent = async (paymentEvent) => {
    const { transactionId, status } = paymentEvent;

    await this.transactionService.updateTransactionStatus(
      transactionId,
      status
    );
  };
}

const webhookService = new WebhookService(transactionService);
module.exports = webhookService;
