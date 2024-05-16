const { winstonError } = require("../config/winston");
function errorHandler(err) {
  winstonError.error(err);
  throw new Error(`An error occurred: ${err.message}`);
}

module.exports = errorHandler;
