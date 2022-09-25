'use strict';
const Joi = require('joi');
const CustomHttpError = require('../../../lib/custom-http-error');
const { ERRORS, HTTP_CODES } = require('../../../lib/constant.js');

const forgotPasswordSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

const verifyEmailCodeSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  code: Joi.string().required(),
});

const updatePasswordSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  code: Joi.string().required(),
  password: Joi.string().required(),
});

class AdminValidator {

  static forgotPasswordValidation(obj) {
    const { value, error } = forgotPasswordSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }

  static verifyEmailCodeValidation(obj) {
    const { value, error } = verifyEmailCodeSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }

  static updatePasswordValidation(obj) {
    const { value, error } = updatePasswordSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }
}

module.exports = AdminValidator;
