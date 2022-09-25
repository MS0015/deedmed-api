'use strict';
const Joi = require('joi');
const CustomHttpError = require('../../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../../lib/constant.js');
const { PHARMACY_ORDER_STATUS } = require('../../../lib/constant');

const createSchema = Joi.object().keys({
  pharmacyId: Joi.string().uuid().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  dob: Joi.date().required(),
  prescriptions: Joi.array().items(Joi.string()).required(),
});

const updateSchema = Joi.object().keys({
  price: Joi.number(),
  status: Joi.string().valid(PHARMACY_ORDER_STATUS.DELIVERED, PHARMACY_ORDER_STATUS.SHIPPING, PHARMACY_ORDER_STATUS.ACCEPTED, PHARMACY_ORDER_STATUS.REJECTED),
});

class PharmacyOrderValidator {
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
}

module.exports = PharmacyOrderValidator;
