'use strict';
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES, ERRORS } = require('../../../lib/constant');
const AvailabilityService = require('../services/availability.service');
const CustomHttpError = require('../../../lib/custom-http-error');

exports.addAvailability = async (req, res, next) => {
  try {
    const result = await AvailabilityService.add(req.user.userId, req.body)
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.AVAILABILITY_ADD_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getAvailability = async (req, res, next) => {
  try {
    const result = await AvailabilityService.get(req.user.userId)
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.AVAILABILITY_GET_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getForComingWeek = async (req, res, next) => {
  try {
    if (req.params['doctorId']) {
      const doctorId = req.params['doctorId'];
      const result = await AvailabilityService.getForComingWeek(doctorId);
      Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.AVAILABILITY_GET_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_DOCTOR_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getForDate = async (req, res, next) => {
  try {
    if (req.params['doctorId']) {
      if (req.params['date']) {
        const doctorId = req.params['doctorId'];
        const date = req.params['date'];
        const result = await AvailabilityService.getForDate(doctorId, date);
        Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.AVAILABILITY_GET_SUCCESS, result);
      } else {
        throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_DATE);
      }
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_DOCTOR_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}
