var appRoot = require("app-root-path");
const { transports, createLogger, format } = require("winston");

var options = {
  info: {
    level: "info",
    filename: `${appRoot}/logs/activity/activity.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
    timestamp: true,
  },
  error: {
    level: "error",
    filename: `${appRoot}/logs/error/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
    timestamp: true,
    prettyPrint: true,
  },
  statusErrors: {
    level: "error",
    filename: `${appRoot}/logs/status-errors/status-errors.log`,
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
  transports: [
    new transports.File(options.info),
    new transports.Console(options.console),
  ],
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
  transports: [new transports.File(options.error)],
  exitOnError: false, // do not exit on handled exceptions
});

var loggerStatusErrors = new createLogger({
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
  transports: [new transports.File(options.statusErrors)],
  exitOnError: false, // do not exit on handled exceptions
});

loggerInfo.stream = {
  write(message) {
    loggerInfo.info(message);
  },
};

exports.winstonInfo = loggerInfo;
exports.winstonError = loggerError;
exports.winstonStatusErrors = loggerStatusErrors;
