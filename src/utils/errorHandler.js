const { winstonError } = require("../../config/winston");
function errorHandler(err, req, res, next) {
  const { status = 500, message = "Internal server error" } = err;
  const errorDetails = {
    message,
    status,
    originalUrl: req.originalUrl,
    requestBody: req.body,
    ip: req.ip,
    method: req.method,
  };

  winstonError.error(JSON.stringify(errorDetails));
  console.error(err.stack);

  res.status(status).json({ error: message });
}

module.exports = errorHandler;
