'use strict';
const Joi = require('joi');

const CustomHttpError = require('../../../lib/custom-http-error');
const { ERRORS, HTTP_CODES } = require('../../../lib/constant.js');

const createSchema = Joi.object().keys({
    orderRef: Joi.string().required(),
    txnAmount: Joi.number().required(),
    category: Joi.string().required(),
    patientId: Joi.number().required(),
    payType: Joi.string().required(),
  });
  
  class PaymentValidator {
    static createValidation(obj) {
      const { value, error } = createSchema.validate(obj);
      if (error) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
      }
      return Promise.resolve(value);
    }
  }
  
  module.exports = PaymentValidator;
  