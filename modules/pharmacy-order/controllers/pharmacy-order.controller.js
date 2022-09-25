'use strict';
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES, ERRORS } = require('../../../lib/constant');
const PharmacyOrderValidator = require('../validators/pharmacy-order.validator');
const PharmacyOrderService = require('../services/pharmacy-order.service');
const CustomHttpError = require('../../../lib/custom-http-error');

exports.create = async (req, res, next) => {
  try {
    const { user: { userId }, body } = req;
    const payload = await PharmacyOrderValidator.createValidation(body);
    const result = await PharmacyOrderService.create(userId, payload);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.PHARMACY_ORDER_CREATE_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getAllByPatientId = async (req, res, next) => {
  try {
    const patientId = req.user.userId;
    const result = await PharmacyOrderService.getAllByPatientId(patientId);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PHARMACY_ORDERS_GET_BY_PATIENT_ID_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getAllByPharmacyId = async (req, res, next) => {
  try {
    const pharmacyId = req.user.userId;
    const result = await PharmacyOrderService.getAllByPharmacyId(pharmacyId);
    Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PHARMACY_ORDERS_GET_BY_PHARMACY_ID_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.getById = async (req, res, next) => {
  try {
    if (req.params['pharmacyOrderId']) {
      const pharmacyOrderId = req.params['pharmacyOrderId'];
      const result = await PharmacyOrderService.getById(pharmacyOrderId);
      Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PHARMACY_ORDER_GET_BY_ID_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_PHARMACY_ORDER_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}

exports.update = async (req, res, next) => {
  try {
    if (req.params['pharmacyOrderId']) {
      const pharmacyOrderId = req.params['pharmacyOrderId'];
      const userId = req.user.userId;
      const payload = await PharmacyOrderValidator.updateValidation(req.body);
      const result = await PharmacyOrderService.update(pharmacyOrderId, payload, userId);
      Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PHARMACY_ORDER_UPDATE_SUCCESS, result);
    } else {
      throw new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.PATH_PARAMETER_MISSING_PHARMACY_ORDER_ID);
    }
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}
