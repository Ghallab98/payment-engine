const { transports, createLogger, format } = require("winston");
const morgan = require("morgan");
class Logger {
  constructor() {
    this.options = {
      console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true,
      },
    };

    this.loggerInfo = this.createLoggerInstance();
    this.loggerError = this.createErrorLoggerInstance();

    this.loggerInfo.stream = {
      write: (message) => {
        this.loggerInfo.info(message);
      },
    };
  }

  createLoggerInstance() {
    return createLogger({
      transports: [new transports.Console(this.options.console)],
      exitOnError: false,
    });
  }

  createErrorLoggerInstance() {
    return createLogger({
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
      transports: [new transports.Console(this.options.console)],
      exitOnError: false,
    });
  }

  get infoLogger() {
    return morgan("combined", { stream: this.loggerInfo.stream });
  }

  get errorLogger() {
    return this.loggerError;
  }
}

module.exports = new Logger();
