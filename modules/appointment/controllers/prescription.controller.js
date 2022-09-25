'use strict';
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES } = require('../../../lib/constant');
const PrescriptionValidator = require('../validators/prescription.validator');
const PrescriptionService = require('../services/prescription.service');

exports.bulkCreate = async (req, res, next) => {
  try {
    const { user: { userId }, body } = req;
    const payload = await PrescriptionValidator.createValidation(body);
    const result = await PrescriptionService.bulkCreate(userId, payload);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.PRESCRIPTIONS_CREATE_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}
