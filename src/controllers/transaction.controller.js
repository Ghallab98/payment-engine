const BaseController = require("./base.controller");
const transactionRepository = require("../repositories/transaction.repository");
const transactionService = require("../services/transaction.service");

class TransactionController extends BaseController {
  constructor() {
    super(transactionRepository);
    this.service = transactionService;
  }
}

module.exports = new TransactionController();
