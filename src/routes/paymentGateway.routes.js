const express = require("express");
const paymentGatewayController = require("../controllers/paymentGateway.controller");
const router = express.Router();

router
  .route("/processSuccess")
  .post(paymentGatewayController.processPaymentSuccess);
router
  .route("/processDeclined")
  .post(paymentGatewayController.processPaymentDecline);

module.exports = router;
