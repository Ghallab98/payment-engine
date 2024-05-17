const transactionService = require("./transaction.service");
class WebhookService {
  constructor() {
    this.transactionService = transactionService;
  }

  async handlePaymentEvent(paymentEvent) {
    const { transactionId, status } = paymentEvent;

    await this.transactionService.updateTransactionStatus(
      transactionId,
      status
    );
    console.log(`Transaction ${transactionId} updated with status: ${status}`);
  }
}

const webhookService = new WebhookService();
module.exports = webhookService;
