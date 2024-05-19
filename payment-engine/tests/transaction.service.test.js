const transactionService = require("../services/transaction.service");
const paymentClientService = require("../services/paymentClient.service");
const transactionRepository = require("../repositories/transaction.repository");
const CustomError = require("../common/exceptions/CustomError");

jest.mock("../services/paymentClient.service");

describe("TransactionService", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a transaction and initiate payment", async () => {
    const transaction = { gateway: "stripe", amount: 100 };
    paymentClientService.initiatePayment.mockResolvedValue({ statusCode: 200 });

    const result = await transactionService.create(transaction);

    expect(result).toMatchObject({ ...transaction, status: "pending" });
    expect(paymentClientService.initiatePayment).toHaveBeenCalledWith({
      transactionId: result.id,
      gateway: result.gateway,
      amount: result.amount,
    });
  });

  it("should throw an error if payment initiation fails", async () => {
    const transaction = { gateway: "stripe", amount: 100 };
    paymentClientService.initiatePayment.mockResolvedValue({ statusCode: 400 });

    await expect(transactionService.create(transaction)).rejects.toThrow(
      CustomError
    );
  });

  it("should update transaction status", async () => {
    const transaction = await transactionRepository.create({
      amount: 100,
      status: "initiated",
      gateway: "stripe",
    });

    await transactionService.updateTransactionStatus(
      transaction.id,
      "successful"
    );

    const updatedTransaction = await transactionRepository.findById(
      transaction.id
    );
    expect(updatedTransaction.status).toBe("successful");
  });

  it("should throw an error if transaction not found when updating status", async () => {
    await expect(
      transactionService.updateTransactionStatus(999, "successful")
    ).rejects.toThrow(CustomError);
  });
});
