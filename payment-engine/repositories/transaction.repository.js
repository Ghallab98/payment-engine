const BaseRepository = require("./base.repository");
const { transaction: Transaction } = require("../models");

class TransactionRepository extends BaseRepository {
  constructor() {
    super(Transaction);
  }
}

const transactionRepository = new TransactionRepository();
module.exports = transactionRepository;
