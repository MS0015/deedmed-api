'use strict';
const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES } = require('../../../lib/constant');
const ReferralValidator = require('../validators/referral.validator');
const ReferralService = require('../services/referral.service');

exports.create = async (req, res, next) => {
  try {
    const { user: { userId }, body } = req;
    const payload = await ReferralValidator.createValidation(body);
    const result = await ReferralService.create(userId, payload);
    Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.REFERRAL_CREATE_SUCCESS, result);
  } catch (err) {
    Utils.errorResponse(res, err);
  }
}
