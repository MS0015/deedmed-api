'use strict';
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES, ERRORS } = require('../../../lib/constant');
const AppointmentValidator = require('../validators/appointment.validator');
const AppointmentService = require('../services/appointment.service');
const CustomHttpError = require('../../../lib/custom-http-error');

exports.create = async (req, res, next) => {
  try {
    const { user: { userId }, body, files } = req;
    const payload = await AppointmentValidator.createValidation(body);
    const result = await AppointmentService.create(userId, payload, files);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.APPOINTMENT_CREATE_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.update = async (req, res, next) => {
  try {
    if (req.params['appointmentId']) {
      const appointmentId = req.params['appointmentId'];
      const { user: { userId }, body } = req;
      const payload = await AppointmentValidator.updateValidation(body);
      const result = await AppointmentService.update(appointmentId, userId, payload);
      Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.APPOINTMENT_UPDATE_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_APPOINTMENT_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getByPatientId = async (req, res, next) => {
  try {
    const patientId = req.user.userId;
    const result = await AppointmentService.getByPatientId(patientId);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.APPOINTMENT_GET_BY_PATIENT_ID_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getByDoctorId = async (req, res, next) => {
  try {
    const doctorId = req.user.userId;
    const result = await AppointmentService.getByDoctorId(doctorId);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.APPOINTMENT_GET_BY_DOCTOR_ID_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getById = async (req, res, next) => {
  try {
    if (req.params['appointmentId']) {
      const appointmentId = req.params['appointmentId'];
      const result = await AppointmentService.getById(appointmentId);
      Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.APPOINTMENT_GET_BY_ID_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_APPOINTMENT_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}
