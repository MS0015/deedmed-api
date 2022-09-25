'use strict';
const AdminAppointmentService = require('../services/admin-appointment.service');
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES, ERRORS } = require('../../../lib/constant');
const CustomHttpError = require('../../../lib/custom-http-error');
const CommonValidator = require('../../../lib/validators/common-validator');
const AdminAppointmentValidator = require('../validators/admin-appointment.validator');

exports.getByPatientId = async (req, res, next) => {
  try {
    if (req.params['patientId']) {
      const patientId = req.params['patientId'];
      const { offset, limit } = await CommonValidator.isValidOffsetLimit(req.query);
      const result = await AdminAppointmentService.getByPatientId(patientId, offset, limit);
      Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.APPOINTMENT_GET_BY_PATIENT_ID_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_PATIENT_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getByDoctorId = async (req, res, next) => {
  try {
    if (req.params['doctorId']) {
      const doctorId = req.params['doctorId'];
      const { offset, limit } = await CommonValidator.isValidOffsetLimit(req.query);
      const result = await AdminAppointmentService.getByDoctorId(doctorId, offset, limit);
      Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.APPOINTMENT_GET_BY_DOCTOR_ID_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_DOCTOR_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const { offset, limit, timeFilter } = await CommonValidator.isValidOffsetLimitTimeFilter(req.query);
    const result = await AdminAppointmentService.getAll(offset, limit, timeFilter);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.APPOINTMENTS_GET_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (req.params['appointmentId']) {
      const appointmentId = req.params['appointmentId'];
      const adminId = req.user.userId;
      const payload = await AdminAppointmentValidator.updateValidation(req.body);
      const result = await AdminAppointmentService.update(appointmentId, adminId, payload);
      Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.APPOINTMENT_UPDATE_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_APPOINTMENT_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}
