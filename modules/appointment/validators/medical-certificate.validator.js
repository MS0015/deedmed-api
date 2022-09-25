'use strict';
const CustomHttpError = require('../../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../../lib/constant.js');
const Joi = require('joi');

const createSchema = Joi.object().keys({
  doctorId: Joi.string().uuid().required(),
  patientId: Joi.string().uuid().required(),
  parentId: Joi.string().uuid().required(),
  appointmentId: Joi.string().uuid().required(),
  date: Joi.date().required(),
  attendingPhysician: Joi.string().required(),
  slmcNo: Joi.string().required(),
  doctorAddress: Joi.string().required(),
  patientName: Joi.string().required(),
  patientAddress: Joi.string().required(),
  diagnosis: Joi.string().required(),
  unfitFrom: Joi.date().required(),
  unfitUntil: Joi.date().required(),
  remarks: Joi.string().required(),
  signature: Joi.string().required(),
});

class MedicalCertificateValidator {
  static createValidation(obj) {
    const { value, error } = createSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }
}

module.exports = MedicalCertificateValidator;
