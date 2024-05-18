const catchAsync = require("../utils/catchAsync");
const paymentService = require("../services/payment.service");

class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  processPayment = catchAsync(async (req, res) => {
    this.paymentService.processPayment(req.body);
    res.status(200).json({ message: "Payment in progress" });
  });
}

module.exports = new PaymentController(paymentService);
