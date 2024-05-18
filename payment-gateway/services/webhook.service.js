const retry = require("async-retry");

class WebhookService {
  constructor(url) {
    this.url = url;
  }

  sendTransactionStatus = async (payload) => {
    await retry(
      async () => {
        await fetch(this.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
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
}

module.exports = new WebhookService(
  `http://${process.env.WEBHOOK_HOST}:${process.env.WEBHOOK_PORT}/webhook/payment`
);
