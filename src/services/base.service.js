class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async updateTransactionStatus(transactionId, newStatus) {
    throw new Error("updateTransactionStatus method must be implemented");
  }
}

module.exports = BaseService;
