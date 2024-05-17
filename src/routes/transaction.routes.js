const express = require("express");
const transactionController = require("../controllers/transaction.controller");
const router = express.Router();

router
  .route("/")
  .get(transactionController.getAll)
  .post(transactionController.create);

router
  .route("/:id")
  .get(transactionController.getById)
  .patch(transactionController.updateById)
  .delete(transactionController.delete);

module.exports = router;
