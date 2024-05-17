class PaymentGatewayService {
  constructor() {
    this.mockedGateway1 = {
      name: "Mocked Gateway 1",
      apiKey: "mocked_api_key_1",
    };
    this.mockedGateway2 = {
      name: "Mocked Gateway 2",
      apiKey: "mocked_api_key_2",
    };
  }

  async processPaymentSuccess(amount) {
    console.log(`Processing successful payment of $${amount}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      message: "Payment processed successfully",
    };
  }

  async processPaymentDecline(amount) {
    console.log(`Processing declined payment of $${amount}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: false,
      message: "Payment declined",
    };
  }
}

const paymentGatewayService = new PaymentGatewayService();
module.exports = paymentGatewayService;
