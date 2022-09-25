'use-strict';

const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES } = require('../../../lib/constant');
const NotificationValidator = require('../validators/notification.validator');
const NotificationService = require('../services/notification.service');

const create = async (req, res, next) => {
    try{
        const payload = await NotificationValidator.createValidation(req.body);
        const result = await NotificationService.create(req.body);
        Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.NOTIFICATION_CREATE_SUCCESS, result);
    }catch(err) {
        Utils.errorResponse(res, err);
    }
}

module.exports = {
    create
}