require("dotenv").config();

module.exports = {
  PAYMENT_HOST: process.env.PAYMENT_HOST,
  PAYMENT_PORT: process.env.PAYMENT_PORT,
  PAYMENT_API_VERSION: process.env.PAYMENT_API_VERSION,
  API_KEY_STRIPE: process.env.API_KEY_STRIPE,
  API_KEY_PAYPAL: process.env.API_KEY_PAYPAL,
  WEBHOOK_HOST: process.env.WEBHOOK_HOST,
  WEBHOOK_PORT: process.env.WEBHOOK_PORT,
};
