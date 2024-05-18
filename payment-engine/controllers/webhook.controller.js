const catchAsync = require("../utils/catchAsync");
const webhookService = require("../services/webhook.service");

class WebhookController {
  constructor(webhookService) {
    this.service = webhookService;
  }
  handlePaymentEvent = catchAsync(async (req, res) => {
    await this.service.handlePaymentEvent(req.body);
    res.status(200).send();
  });
}

module.exports = new WebhookController(webhookService);
