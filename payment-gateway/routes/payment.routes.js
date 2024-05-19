const express = require("express");
const paymentValidator = require("../common/middlewares/validators/payment.validator");
const paymentController = require("../controllers/payment.controller");
const router = express.Router();

router
  .route("/payment")
  .post(paymentValidator.processPayment, paymentController.processPayment);

module.exports = router;
