const express = require("express");
const transactionController = require("../controllers/transaction.controller");
const transactionValidator = require("../common/middlewares/validators/transaction.validator");
const router = express.Router();

router
  .route("/")
  .get(transactionController.getAll)
  .post(transactionValidator.create, transactionController.create);

router
  .route("/:id")
  .get(transactionController.getById)
  .patch(transactionController.updateById)
  .delete(transactionController.delete);

module.exports = router;
