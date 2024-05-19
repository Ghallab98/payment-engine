const BaseController = require("./base.controller");
const transactionService = require("../services/transaction.service");

class TransactionController extends BaseController {
  constructor(transactionService) {
    super(transactionService);
  }
}

module.exports = new TransactionController(transactionService);
