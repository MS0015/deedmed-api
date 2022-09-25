'use strict';
const Joi = require('joi');
const CustomHttpError = require('../../../lib/custom-http-error');
const { USER_TYPES, GENDER, ERRORS, HTTP_CODES } = require('../../../lib/constant.js');
const { AUTH_PROVIDER } = require('../../../lib/constant');

const signUpSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  authProvider: Joi.string().valid(AUTH_PROVIDER.EMAIL_PASSWORD, AUTH_PROVIDER.GOOGLE, AUTH_PROVIDER.FACEBOOK).required(),
  password: Joi.alternatives().conditional('authProvider', {
    is: AUTH_PROVIDER.EMAIL_PASSWORD,
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  phoneNumber: Joi.string().required(),
  userType: Joi.string().valid(USER_TYPES.GUARDIAN, USER_TYPES.PATIENT).required(),
  name: Joi.string().required(),
  gender: Joi.string().valid(GENDER.MALE, GENDER.FEMALE).required(),
  district: Joi.string().required(),
  address: Joi.string().required(),
  dob: Joi.date().required(),
  otp: Joi.number().required(),
});

const updateProfileSchema = Joi.object().keys({
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  name: Joi.string(),
  gender: Joi.string().valid(GENDER.MALE, GENDER.FEMALE),
  district: Joi.string(),
  address: Joi.string(),
  dob: Joi.date(),
  longTermMedic: Joi.array().items(Joi.string()).min(1),
  allergies: Joi.array().items(Joi.string()).min(1),
});

const validateExistingPatientsSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  authProvider: Joi.string().valid(AUTH_PROVIDER.EMAIL_PASSWORD, AUTH_PROVIDER.GOOGLE, AUTH_PROVIDER.FACEBOOK).required(),
  password: Joi.alternatives().conditional('authProvider', {
    is: AUTH_PROVIDER.EMAIL_PASSWORD,
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  phoneNumber: Joi.string().required(),
  userType: Joi.string().valid(USER_TYPES.GUARDIAN, USER_TYPES.PATIENT).required(),
  name: Joi.string().required(),
  gender: Joi.string().valid(GENDER.MALE, GENDER.FEMALE).required(),
  district: Joi.string().required(),
  address: Joi.string().required(),
  dob: Joi.date().required(),
});

class UserPatientValidator {
  static signUpValidation(obj) {
    const { value, error } = signUpSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }

  static updateProfileValidation(obj) {
    const { value, error } = updateProfileSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }

  static validateExistingPatientsValidation(obj) {
    const { value, error } = validateExistingPatientsSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }
}

module.exports = UserPatientValidator;
