const retry = require("async-retry");

module.exports = async (fn) => {
  return await retry(
    async (bail) => {
      try {
        return await fn();
      } catch (error) {
        if (error.status !== 502) {
          bail(error);
        }
        throw error;
      }
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
