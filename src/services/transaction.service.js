const BaseService = require("./base.service");
const transactionRepository = require("../repositories/transaction.repository");

class TransactionService extends BaseService {
  async updateTransactionStatus(transactionId, newStatus) {
    let transaction;
    await retry(
      async () => {
        transaction = await this.repository.findById(transactionId);
        if (!transaction) {
          throw new Error("Transaction not found");
        }

        // Update transaction status
        transaction.status = newStatus;
        await this.repository.update(transaction);
      },
      {
        retries: 3,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: 5000,
      }
    );
    return transaction;
  }
}

const transactionService = new TransactionService(transactionRepository);
module.exports = transactionService;
