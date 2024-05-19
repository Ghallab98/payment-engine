const BaseService = require("./base.service");
const paymentClientService = require("./paymentClient.service");
const transactionRepository = require("../repositories/transaction.repository");
const CustomError = require("../common/exceptions/CustomError");
class TransactionService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  create = async (transaction) => {
    let createdTransaction = await this.repository.create(transaction);

    const payload = {
      transactionId: createdTransaction.id,
      gateway: createdTransaction.gateway,
      amount: createdTransaction.amount,
    };
    const result = await paymentClientService.initiatePayment(payload);
    if (result.statusCode === 200)
      createdTransaction = await this.updateTransactionStatus(
        createdTransaction.id,
        "pending"
      );
    else {
      await this.updateTransactionStatus(createdTransaction.id, "declined");
      throw new CustomError({
        message: "Payment failed",
        status: 400,
      });
    }
    return createdTransaction;
  };

  updateTransactionStatus = async (transactionId, newStatus) => {
    const transaction = await this.repository.findById(transactionId);
    if (!transaction) {
      throw new CustomError({
        message: "Transaction not found",
        status: 404,
      });
    }

    transaction.status = newStatus;
    return transaction.save();
  };
}

const transactionService = new TransactionService(transactionRepository);
module.exports = transactionService;
