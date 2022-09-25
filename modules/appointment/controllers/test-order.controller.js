'use strict';
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES, ERRORS } = require('../../../lib/constant');
const TestOrderValidator = require('../validators/test-order.validator');
const TestOrderService = require('../services/test-order.service');
const CustomHttpError = require('../../../lib/custom-http-error');

exports.create = async (req, res, next) => {
  try {
    const { user: { userId }, body } = req;
    const payload = await TestOrderValidator.createValidation(body);
    const result = await TestOrderService.create(userId, payload);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.TEST_ORDER_CREATE_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.get = async (req, res, next) => {
  try {
    if (req.params['appointmentId']) {
      const appointmentId = req.params['appointmentId'];
      const result = await TestOrderService.get(appointmentId);
      // res.setHeader('Content-Type', 'application/pdf');
      Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.TEST_ORDER_GET_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_APPOINTMENT_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}
