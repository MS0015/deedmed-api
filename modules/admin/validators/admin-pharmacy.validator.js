'use strict';
const Joi = require('joi');
const CustomHttpError = require('../../../lib/custom-http-error');
const { ERRORS, HTTP_CODES, SERVICE_AREAS_PHARMACY } = require('../../../lib/constant.js');

const createSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
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

const updateSchema = Joi.object().keys({
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  businessName: Joi.string(),
  district: Joi.string(),
  address: Joi.string(),
  pharmacistName: Joi.string(),
  regNo: Joi.string(),
  serviceArea: Joi.string().valid(SERVICE_AREAS_PHARMACY.HOME_DELIVERY, SERVICE_AREAS_PHARMACY.ON_SIGHT, SERVICE_AREAS_PHARMACY.BOTH),
  maxDeliveryDistance: Joi.alternatives().conditional('serviceArea', {
    is: Joi.string().valid(SERVICE_AREAS_PHARMACY.HOME_DELIVERY, SERVICE_AREAS_PHARMACY.BOTH),
    then: Joi.number().positive().required(),
    otherwise: Joi.forbidden(),
  }),
  description: Joi.string(),
});

const getAllValidationSchema = Joi.object().keys({
  offset: Joi.number().default(0),
  limit: Joi.number().default(10),
  searchText: Joi.string(),
  maxDeliveryDistanceFilter: Joi.number().positive(),
  serviceAreaFilter: Joi.string().valid(SERVICE_AREAS_PHARMACY.HOME_DELIVERY, SERVICE_AREAS_PHARMACY.ON_SIGHT, SERVICE_AREAS_PHARMACY.BOTH),
});

class AdminPharmacyValidator {
  static createValidation(obj) {
    const { value, error } = createSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }

  static updateValidation(obj) {
    const { value, error } = updateSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }

  static getAllValidation(obj) {
    const { value, error } = getAllValidationSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }
}

module.exports = AdminPharmacyValidator;
