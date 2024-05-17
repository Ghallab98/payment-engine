const transactionRepository = require("../repositories/transaction.repository");
const CustomError = require("../utils/CustomError");

class TransactionService {
  constructor(repository) {
    this.repository = repository;
  }

  async updateTransactionStatus(transactionId, newStatus) {
    let transaction;
    await retry(
      async () => {
        transaction = await this.repository.findById(transactionId);
        if (!transaction) {
          throw new CustomError({
            message: "Transaction not found",
            status: 404,
          });
        }

        transaction.status = newStatus;
        await this.repository.update(transaction);
      },
      {
        retries: 3,
        factor: 2,
        minTimeout: 1000,
        maxTimeout: 5000,
        randomize: true,
        onRetry: (error, i) => {
          console.warn(`Retrying ${i + 1} time due to: ${error.message}`);
        },
      }
    );
    return transaction;
  }
}

const transactionService = new TransactionService(transactionRepository);
module.exports = transactionService;
