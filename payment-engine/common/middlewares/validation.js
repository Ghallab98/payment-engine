const { validationResult } = require("express-validator");
const logger = require("../utils/Logger");

module.exports = (checks) => [
  ...checks,
  (req, res, next) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      errors = errors.array({ onlyFirstError: true });
      if (errors[0].msg.hasOwnProperty("en"))
        errors[0].msg = errors[0].msg[req.headers.locale];
      logger.errorLogger.error(
        `422 - ${JSON.stringify(errors)} - Body: ${JSON.stringify(
          req.body
        )} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );

      return res.status(422).json({ message: errors[0].msg, errors });
    }

    next();
  },
];
