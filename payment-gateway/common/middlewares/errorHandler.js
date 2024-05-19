const logger = require("../utils/Logger");
function errorHandler(err, req, res, next) {
  const { status = 500, message = "Internal server error" } = err;
  const errorDetails = {
    message,
    status,
    originalUrl: req.originalUrl,
    requestBody: req.body,
    ip: req.ip,
    method: req.method,
    stack: err.stack,
  };

  logger.errorLogger.error(JSON.stringify(errorDetails));

  res.status(status).json({ error: message });
}

module.exports = errorHandler;
