const { body } = require("express-validator");
const { PAYMENT_GATEWAYS } = require("../../constants");
const CustomError = require("../../utils/CustomError");
const validation = require("../validation");

class PaymentValidator {
  processPayment = validation([
    body("transactionId")
      .exists()
      .withMessage("Please provide a transactionId")
      .isInt()
      .withMessage("transactionId should be an integer"),
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
    body("apiKey")
      .exists()
      .withMessage("Please provide an apiKey")
      .custom((value, { req }) => {
        const gateway = req.body.gateway;
        const apiKeyEnv = process.env[`API_KEY_${gateway.toUpperCase()}`];
        if (value !== apiKeyEnv) {
          throw new CustomError({ status: 401, message: "Invalid API key" });
        }
        return true;
      }),
  ]);
}

module.exports = new PaymentValidator();
