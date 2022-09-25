'use strict';
const CustomHttpError = require('../../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../../lib/constant.js');
const Joi = require('joi');
const { SLOT_TYPES, APPOINTMENT_TYPES, APPOINTMENT_STATUS } = require('../../../lib/constant');

const createSchema = Joi.object().keys({
  doctorId: Joi.string().uuid().required(),
  patientId: Joi.string().uuid().required(),
  date: Joi.date().required(),
  slotTime: Joi.string().required(),
  slotType: Joi.string().valid(SLOT_TYPES.MORNING, SLOT_TYPES.EVENING).required(),
  appointmentType: Joi.string().valid(APPOINTMENT_TYPES.ONLINE, APPOINTMENT_TYPES.PHYSICAL).required(),
  purpose: Joi.string().required(),
  medicalDetails: Joi.string().required(),
  message: Joi.string().required(),
  amount: Joi.number().required(),
  paymentId: Joi.string().required(),
  parentId: Joi.string().uuid().required(),
});

const updateSchema = Joi.object().keys({
  date: Joi.date(),
  slotTime: Joi.string(),
  slotType: Joi.string().valid(SLOT_TYPES.MORNING, SLOT_TYPES.EVENING),
  appointmentType: Joi.string().valid(APPOINTMENT_TYPES.ONLINE, APPOINTMENT_TYPES.PHYSICAL),
  purpose: Joi.string(),
  medicalDetails: Joi.string(),
  message: Joi.string(),
  status: Joi.string().valid(APPOINTMENT_STATUS.PENDING, APPOINTMENT_STATUS.COMPLETED, APPOINTMENT_STATUS.CANCELED, APPOINTMENT_STATUS.ONGOING),
  doctorRating: Joi.number(),
  patientRating: Joi.number(),
  comments: Joi.array().items(Joi.string()),
  attachments: Joi.array().items(Joi.string()),
});

class AppointmentValidator {
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

module.exports = AppointmentValidator;
