const retry = require("../common/utils/retry");
const config = require("../config/config");
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
  `http://${config.WEBHOOK_HOST}:${config.WEBHOOK_PORT}/webhook/payment`
);
