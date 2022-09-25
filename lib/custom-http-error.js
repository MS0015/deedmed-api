'use strict';

class CustomHttpError extends Error {
  constructor(statusCode, error, message) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
  }
}

module.exports = CustomHttpError;
