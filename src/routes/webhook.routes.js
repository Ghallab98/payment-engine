const express = require("express");
const webhookController = require("../controllers/webhook.controller");
const router = express.Router();

router.route("/payment").post(webhookController.handlePaymentEvent);

module.exports = router;
