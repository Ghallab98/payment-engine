const BaseService = require("./base.service");
const transactionRepository = require("../repositories/transaction.repository");
const CustomError = require("../common/exceptions/CustomError");
const retry = require("../common/utils/retry");
class TransactionService extends BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  create = async (transaction) => {
    const createdTransaction = await this.repository.create(transaction);

    const payload = {
      transactionId: createdTransaction.id,
      gateway: createdTransaction.gateway,
      apiKey:
        process.env[`API_KEY_${createdTransaction.gateway.toUpperCase()}`],
    };
    const result = await retry(async () => {
      const paymentResult = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return paymentResult.json();
    });

    if (result.status === 200)
      await this.updateTransactionStatus(transaction.id, "pending");
    else {
      await this.updateTransactionStatus(transaction.id, "declined");
      throw new CustomError({
        message: result.message,
        status: 400,
      });
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
