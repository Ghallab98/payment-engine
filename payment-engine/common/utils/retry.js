const retry = require("async-retry");

module.exports = async (fn) => {
  return await retry(
    async () => {
      return await fn();
    },
    {
      retries: 3,
      factor: 2,
      minTimeout: 1000,
      maxTimeout: 5000,
      randomize: true,
      onRetry: (error, i) => {
        console.warn(`Retrying ${i + 1} time due to: ${error.message}`);
      },
    }
  );
};
