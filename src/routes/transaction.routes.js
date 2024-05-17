const express = require("express");
const TransactionController = require("../controllers/transaction.controller");
const router = express.Router();

router
  .route("/")
  .get(TransactionController.getAll)
  .post(TransactionController.create);

router
  .route("/:id")
  .get(TransactionController.getById)
  .patch(TransactionController.updateById)
  .delete(TransactionController.delete);

module.exports = router;
