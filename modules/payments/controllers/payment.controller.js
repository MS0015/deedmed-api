'use-strict';

const Utils = require('../../../lib/utils');
const { HTTP_CODES, MESSAGES } = require('../../../lib/constant');
const PaymentValidator = require('../validators/payment.validator');
const PaymentService = require('../services/payment.service');
const axios = require('axios');
const FormData = require('form-data');

const create = async (req, res, next) => {
    try{
        const payload = await PaymentValidator.createValidation(req.body);
        const result = await PaymentService.create(req.body);
        Utils.successResponse(res, HTTP_CODES.CREATED, MESSAGES.PAYMENT_CREATE_SUCCESS, result);
    }catch(err) {
        Utils.errorResponse(res, err);
    }
}

const getPaymentInfo = async(req, res, next) => {
    try{
       
    }catch(err) {
        Utils.errorResponse(res, err);
    }
}

const paymentConfirmation = async(req, res, next) => {
    try{
        const result = await PaymentService.confirmation(req.body);
        console.log('result', result);
        Utils.successResponse(res, HTTP_CODES.OK, MESSAGES.PAYMENT_UPDATE_SUCCESS, result);

    }catch(err) {
        Utils.errorResponse(res, err);
    }
}




module.exports = {
    create,
    getPaymentInfo,
    paymentConfirmation

}