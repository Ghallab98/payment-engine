class PaymentService {
  generateStatus = () => {
    throw new Error("Method 'generateStatus()' must be implemented.");
  };

  processPayment = async ({ transactionId }) => {
    throw new Error("Method 'processPayment()' must be implemented.");
  };
}

module.exports = PaymentService;
