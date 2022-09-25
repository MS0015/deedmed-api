'use strict';
const Joi = require('joi');
const CustomHttpError = require('../../../lib/custom-http-error');
const { USER_TYPES, ERRORS, HTTP_CODES, SERVICE_AREAS_PHARMACY } = require('../../../lib/constant.js');
const { AUTH_PROVIDER } = require('../../../lib/constant');

const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  authProvider: Joi.string().valid(AUTH_PROVIDER.EMAIL_PASSWORD, AUTH_PROVIDER.GOOGLE, AUTH_PROVIDER.FACEBOOK).required(),
  password: Joi.alternatives().conditional('authProvider', {
    is: AUTH_PROVIDER.EMAIL_PASSWORD,
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  phoneNumber: Joi.string().required(),
  userType: Joi.string().valid(USER_TYPES.PHARMACY).required(),
  businessName: Joi.string().required(),
  district: Joi.string().required(),
  address: Joi.string().required(),
  pharmacistName: Joi.string().required(),
  regNo: Joi.string().required(),
  brNo: Joi.string().required(),
  serviceArea: Joi.string().valid(SERVICE_AREAS_PHARMACY.HOME_DELIVERY, SERVICE_AREAS_PHARMACY.ON_SIGHT, SERVICE_AREAS_PHARMACY.BOTH).required(),
  maxDeliveryDistance: Joi.alternatives().conditional('serviceArea', {
    is: SERVICE_AREAS_PHARMACY.ON_SIGHT,
    then: Joi.forbidden(),
    otherwise: Joi.number().positive().required(),
  }),
  description: Joi.string(),
  otp: Joi.number().required(),
});

const updateProfileSchema = Joi.object().keys({
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  businessName: Joi.string(),
  district: Joi.string(),
  address: Joi.string(),
  pharmacistName: Joi.string(),
  regNo: Joi.string(),
  brNo: Joi.string(),
  maxDeliveryDistance: Joi.number().positive(),
  serviceArea: Joi.string().valid(SERVICE_AREAS_PHARMACY.HOME_DELIVERY, SERVICE_AREAS_PHARMACY.ON_SIGHT, SERVICE_AREAS_PHARMACY.BOTH),
  description: Joi.string(),
  locationLat: Joi.number().min(-90).max(90),
  locationLong: Joi.number().min(-180).max(180),
});

const validateExistingPharmaciesSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  authProvider: Joi.string().valid(AUTH_PROVIDER.EMAIL_PASSWORD, AUTH_PROVIDER.GOOGLE, AUTH_PROVIDER.FACEBOOK).required(),
  password: Joi.alternatives().conditional('authProvider', {
    is: AUTH_PROVIDER.EMAIL_PASSWORD,
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  phoneNumber: Joi.string().required(),
  userType: Joi.string().valid(USER_TYPES.PHARMACY).required(),
  businessName: Joi.string().required(),
  district: Joi.string().required(),
  address: Joi.string().required(),
  pharmacistName: Joi.string().required(),
  regNo: Joi.string().required(),
  brNo: Joi.string().required(),
  serviceArea: Joi.string().valid(SERVICE_AREAS_PHARMACY.HOME_DELIVERY, SERVICE_AREAS_PHARMACY.ON_SIGHT, SERVICE_AREAS_PHARMACY.BOTH).required(),
  maxDeliveryDistance: Joi.alternatives().conditional('serviceArea', {
    is: SERVICE_AREAS_PHARMACY.ON_SIGHT,
    then: Joi.forbidden(),
    otherwise: Joi.number().positive().required(),
  }),
  description: Joi.string(),
});

class UserPharmacyValidator {
  static registerValidation(obj) {
    const { value, error } = registerSchema.validate(obj);
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

  static validateExistingPharmaciesValidation(obj) {
    const { value, error } = validateExistingPharmaciesSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }
}

module.exports = UserPharmacyValidator;
