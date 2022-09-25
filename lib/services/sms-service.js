'use strict';
const axios = require('axios');
const SECRET_CONFIGS = require('../../secret-config');
const { HTTP_CODES, ERRORS, MESSAGES } = require('../constant');
const CustomHttpError = require('../custom-http-error');

class SmsService {
  static async sendSMS(to, message) {
    try {
      if (SECRET_CONFIGS.SEND_SMS === 'true') {
        const config = {
          method: 'get',
          url: `${SECRET_CONFIGS.SMS_SERVICE_BASE_URL}/send?user_id=${SECRET_CONFIGS.SMS_SERVICE_ACCOUNT_ID}&api_key=${SECRET_CONFIGS.SMS_SERVICE_ACCOUNT_API_KEY}&sender_id=${SECRET_CONFIGS.SMS_SERVICE_ACCOUNT_SENDER_ID}&to=${to}&message=${message}`,
        };
        const result = await axios(config);
        if (result.status === HTTP_CODES.OK && result.data.status === 'success' && result.data.data === 'Sent') {
          return Promise.resolve();
        } else {
          return Promise.reject(new CustomHttpError(HTTP_CODES.SERVER_ERROR, ERRORS.SERVER_ERROR, MESSAGES.SEND_OTP_FAILED));
        }
      } else {
        return Promise.resolve();
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = SmsService;
