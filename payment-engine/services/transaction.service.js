const transactionRepository = require("../repositories/transaction.repository");
const CustomError = require("../utils/CustomError");
const retry = require("async-retry");

class TransactionService {
  constructor(repository) {
    this.repository = repository;
  }

  create = async (body) => {
    const { transaction } = body;

    this.repository.create(transaction);
    const { amount, id: transactionId } = transaction;

    if (!result.success) {
      await this.updateTransactionStatus(transactionId, "declined");
      throw new CustomError({
        message: result.message,
        status: 400,
      });
    } else {
      await this.updateTransactionStatus(transactionId, "success");
    }
    return transaction;
  };

  updateTransactionStatus = async (transactionId, newStatus) => {
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
  };
}

const transactionService = new TransactionService(transactionRepository);
module.exports = transactionService;
