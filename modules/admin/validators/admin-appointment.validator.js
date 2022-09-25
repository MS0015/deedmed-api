'use strict';
const Joi = require('joi');
const CustomHttpError = require('../../../lib/custom-http-error');
const { ERRORS, HTTP_CODES, SLOT_TYPES, APPOINTMENT_STATUS } = require('../../../lib/constant.js');

const updateSchema = Joi.object().keys({
  date: Joi.date(),
  slotTime: Joi.string(),
  slotType: Joi.string().valid(SLOT_TYPES.MORNING, SLOT_TYPES.EVENING),
  status: Joi.string().valid(APPOINTMENT_STATUS.PENDING, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.CANCELED, APPOINTMENT_STATUS.ONGOING),
});

class AdminAppointmentValidator {
  static updateValidation(obj) {
    const { value, error } = updateSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }
}

module.exports = AdminAppointmentValidator;
