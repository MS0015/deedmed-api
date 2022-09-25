'use strict';
const Joi = require('joi');
const CustomHttpError = require('../../../lib/custom-http-error');
const { ERRORS, HTTP_CODES } = require('../../../lib/constant.js');
const { USER_TYPES } = require('../../../lib/constant');

const signInSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const sendOTPSchema = Joi.object().keys({
  phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
});

const validateExistingUsersSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
});

const socialTokenSchema = Joi.object().keys({
  token: Joi.string().required(),
});

const socialSignInSchema = Joi.object().keys({
  token: Joi.string().required(),
  userTypes: Joi.array().items(Joi.string().valid(USER_TYPES.DOCTOR, USER_TYPES.GUARDIAN, USER_TYPES.PATIENT, USER_TYPES.PHARMACY)).min(1).required(),
});

const forgotPasswordSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  userTypes: Joi.array().items(Joi.string().valid(USER_TYPES.DOCTOR, USER_TYPES.GUARDIAN, USER_TYPES.PATIENT, USER_TYPES.PHARMACY)).min(1).required(),
});

const verifyEmailCodeSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  userTypes: Joi.array().items(Joi.string().valid(USER_TYPES.DOCTOR, USER_TYPES.GUARDIAN, USER_TYPES.PATIENT, USER_TYPES.PHARMACY)).min(1).required(),
  code: Joi.string().required(),
});

const updatePasswordSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  userTypes: Joi.array().items(Joi.string().valid(USER_TYPES.DOCTOR, USER_TYPES.GUARDIAN, USER_TYPES.PATIENT, USER_TYPES.PHARMACY)).min(1).required(),
  code: Joi.string().required(),
  password: Joi.string().required(),
});

class UserValidator {
  static signInValidation(obj) {
    const { value, error } = signInSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }

  static sendOTPValidation(obj) {
    const { value, error } = sendOTPSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }

  static validateExistingUsersValidation(obj) {
    const { value, error } = validateExistingUsersSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }

  static socialTokenValidation(obj) {
    const { value, error } = socialTokenSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }

  static socialSignInValidation(obj) {
    const { value, error } = socialSignInSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }

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

module.exports = UserValidator;
