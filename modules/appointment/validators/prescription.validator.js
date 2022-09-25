'use strict';
const CustomHttpError = require('../../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../../lib/constant.js');
const Joi = require('joi');
const { PRESCRIPTION_TYPE } = require('../../../lib/constant');

const createSchema = Joi.array().items(Joi.object().keys({
  doctorId: Joi.string().uuid().required(),
  patientId: Joi.string().uuid().required(),
  parentId: Joi.string().uuid().required(),
  appointmentId: Joi.string().uuid().required(),
  type: Joi.string().valid(PRESCRIPTION_TYPE.TABLET, PRESCRIPTION_TYPE.SYRUP, PRESCRIPTION_TYPE.TOPICAL).required(),
  name: Joi.string().required(),
  duration: Joi.string().required(),
  quantityOrVolume: Joi.alternatives().conditional('type', {
    is: PRESCRIPTION_TYPE.TOPICAL,
    then: Joi.forbidden(),
    otherwise: Joi.string().required()
  }),
  frequency: Joi.string().required(),
  remarks: Joi.string()
})).required();

class PrescriptionValidator {
  static createValidation(obj) {
    const { value, error } = createSchema.validate(obj);
    if (error) {
      return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, error.message));
    }
    return Promise.resolve(value);
  }
}

module.exports = PrescriptionValidator;
