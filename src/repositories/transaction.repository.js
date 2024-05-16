const BaseRepository = require("./baseRepository");
const Transaction = require("../models/Transaction");

class TransactionRepository extends BaseRepository {
  async findById(transactionId) {
    const transaction = await Transaction.findByPk(transactionId);
    return transaction;
  }

  async update(transaction) {
    await transaction.save();
    return transaction;
  }
}

const transactionRepository = new TransactionRepository();
module.exports = transactionRepository;
