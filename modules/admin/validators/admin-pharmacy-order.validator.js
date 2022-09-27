'use strict';
const Joi = require('joi');
const CustomHttpError = require('../../../lib/custom-http-error');
const { ERRORS, HTTP_CODES, SERVICE_AREAS_PHARMACY, PHARMACY_ORDER_STATUS } = require('../../../lib/constant.js');
const Utils = require('../../../lib/utils');

const getAllOrdersValidationSchema = Joi.object().keys({
  pharmacyId: Joi.string().uuid(),
  offset: Joi.number().default(0),
  limit: Joi.number().default(10),
  type: Joi.string().valid(SERVICE_AREAS_PHARMACY.BOTH, SERVICE_AREAS_PHARMACY.HOME_DELIVERY, SERVICE_AREAS_PHARMACY.ON_SIGHT).required(),
  statuses: Joi.array().items(Joi.string().valid(PHARMACY_ORDER_STATUS.PENDING, PHARMACY_ORDER_STATUS.ACCEPTED, PHARMACY_ORDER_STATUS.SHIPPING, PHARMACY_ORDER_STATUS.DELIVERED, PHARMACY_ORDER_STATUS.REJECTED).required()).required().min(1),
  fromDate: Joi.date().required(),
  toDate: Joi.date().default(Utils.getDate()).min(Joi.ref('fromDate'))
});

class AdminPharmacyOrderValidator {
  static getAllOrders(obj) {
    const { value, error } = getAllOrdersValidationSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }
}

module.exports = AdminPharmacyOrderValidator;
