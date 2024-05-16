const { expect } = require("chai");
const PaymentGatewayService = require("../src/services/paymentGateway.service");

describe("PaymentGatewayService", () => {
  let paymentGatewayService;

  beforeEach(() => {
    paymentGatewayService = new PaymentGatewayService();
  });

  describe("processPaymentSuccess", () => {
    it("should process a successful payment", async () => {
      const response = await paymentGatewayService.processPaymentSuccess(100);
      expect(response.success).toBe(true);
      expect(response.message).toEqual("Payment processed successfully");
    });
  });

  describe("processPaymentDecline", () => {
    it("should decline a payment", async () => {
      const response = await paymentGatewayService.processPaymentDecline(100);
      expect(response.success).toBe(false);
      expect(response.message).toEqual("Payment declined");
    });
  });
});
