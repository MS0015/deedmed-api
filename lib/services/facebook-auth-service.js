'use strict';
const CustomHttpError = require('../custom-http-error');
const { HTTP_CODES, ERRORS } = require('../constant.js');
const { MESSAGES } = require('../constant');
const axios = require('axios');

class FacebookAuthService {
  static async verifyToken(accessToken) {
    try {
      const payload = await axios.get(
        `https://graph.facebook.com/me?fields=email&access_token=${accessToken}`
      );
      if (!payload) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.UNAUTHORIZED, ERRORS.AUTHENTICATION_ERROR, MESSAGES.FACEBOOK_SIGN_UP_FAILED));
      }
      const { email } = payload;
      return Promise.resolve({ email });
    } catch (err) {
      return Promise.reject(err);
    }
  }

}

module.exports = FacebookAuthService;
