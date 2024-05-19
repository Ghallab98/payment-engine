const { body } = require("express-validator");
const { PAYMENT_GATEWAYS } = require("../../../constants");
const validation = require("../validation");

class PaymentValidator {
  create = validation([
    body("amount")
      .exists()
      .withMessage("Please provide an amount")
      .isInt()
      .withMessage("amount should be an integer"),
    body("gateway")
      .exists()
      .withMessage("Please provide a gateway")
      .isIn(PAYMENT_GATEWAYS)
      .withMessage("Invalid gateway"),
  ]);
}

module.exports = new PaymentValidator();
