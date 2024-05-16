const BaseController = require("./base.controller");
const transactionRepository = require("../repositories/transaction.repository");
const TransactionService = require("../services/transaction.service");

class TransactionController extends BaseController {
  constructor() {
    super(transactionRepository);
  }
}

module.exports = new TransactionController();
