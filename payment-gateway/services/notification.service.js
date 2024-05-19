const retry = require("../common/utils/retry");
const config = require("../config/config");
const fetch = require("node-fetch");
class NotificationService {
  constructor(url) {
    this.url = url;
  }

  sendTransactionStatus = async (payload) => {
    await retry(async () => {
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    });
  };
}

module.exports = new NotificationService(
  `http://${config.WEBHOOK_HOST}:${config.WEBHOOK_PORT}/v1/webhook/payment`
);
