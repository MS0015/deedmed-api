'use strict';
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES } = require('../../../lib/constant');
const MedicalCertificateValidator = require('../validators/medical-certificate.validator');
const MedicalCertificateService = require('../services/medical-certificate.service');

exports.create = async (req, res, next) => {
  try {
    const { user: { userId }, body } = req;
    const payload = await MedicalCertificateValidator.createValidation(body);
    const result = await MedicalCertificateService.create(userId, payload);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.MEDICAL_CERTIFICATE_CREATE_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}
