class CustomError extends Error {
  constructor({ message, status }) {
    super(message);

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    // This status will be used in our error handling middleware
    this.status = status;

    // This will ensure that CustomError instances are treated like Error instances
    // when checked against the Error class with 'instanceof'
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
