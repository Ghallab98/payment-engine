const catchAsync = require("../common/utils/catchAsync");
const stripeService = require("../services/stripe.service");
const paypalService = require("../services/paypal.service");
class PaymentController {
  constructor() {
    this.paymentServices = {
      stripe: stripeService,
      paypal: paypalService,
    };
  }

  processPayment = catchAsync(async (req, res) => {
    this.paymentServices[req.body.gateway].processPayment(req.body);
    res.status(200).json({ message: "Payment in progress" });
  });
}

module.exports = new PaymentController();
