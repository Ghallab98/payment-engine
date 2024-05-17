const catchAsync = require("../utils/catchAsync");
const paymentGatewayService = require("../services/paymentGateway.service");

class PaymentGatewayController {
  constructor() {
    this.service = paymentGatewayService;
  }

  processPaymentSuccess = catchAsync(async (req, res) => {
    const result = this.service.processPaymentSuccess(req.body);
    res.status(200).json(result);
  });

  processPaymentDecline = catchAsync(async (req, res) => {
    const result = this.service.processPaymentDecline(req.body);
    res.status(200).json(result);
  });
}

module.exports = new PaymentGatewayController();
