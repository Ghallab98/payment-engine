const { transports, createLogger, format } = require("winston");

var options = {
  info: {
    level: "info",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
    timestamp: true,
  },
  error: {
    level: "error",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
    timestamp: true,
    prettyPrint: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

var loggerInfo = new createLogger({
  transports: [new transports.Console(options.console)],
  exitOnError: false, // do not exit on handled exceptions
});

var loggerError = new createLogger({
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.printf((info) => {
      return JSON.stringify({
        timestamp: info.timestamp,
        message: info.message,
      });
    })
  ),
  transports: [new transports.Console(options.console)],
  exitOnError: false, // do not exit on handled exceptions
});

loggerInfo.stream = {
  write(message) {
    loggerInfo.info(message);
  },
};

exports.winstonInfo = loggerInfo;
exports.winstonError = loggerError;
