const TransactionService = require("../src/services/transactionService");

// Mock TransactionRepository
const mockTransactionRepository = {
  findById: jest.fn(),
  update: jest.fn(),
};

const transactionService = new TransactionService(mockTransactionRepository);

describe("TransactionService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("updateTransactionStatus", () => {
    it("should update transaction status", async () => {
      mockTransactionRepository.findById.mockResolvedValueOnce({
        id: 1,
        status: "initiated",
      });

      mockTransactionRepository.update.mockResolvedValueOnce({
        id: 1,
        status: "pending",
      });

      const updatedTransaction =
        await transactionService.updateTransactionStatus(1, "pending");
      expect(updatedTransaction.id).toBe(1);
      expect(updatedTransaction.status).toBe("pending");

      expect(mockTransactionRepository.findById).toHaveBeenCalledWith(1);
      expect(mockTransactionRepository.update).toHaveBeenCalledWith({
        id: 1,
        status: "pending",
      });
    });

    it("should throw error if transaction is not found", async () => {
      mockTransactionRepository.findById.mockResolvedValueOnce(null);

      await expect(
        transactionService.updateTransactionStatus(1, "pending")
      ).rejects.toThrow("Transaction not found");

      expect(mockTransactionRepository.findById).toHaveBeenCalledWith(1);
      expect(mockTransactionRepository.update).not.toHaveBeenCalled();
    });
  });
});
