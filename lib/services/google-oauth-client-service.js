'use strict';
const SECRET_CONFIGS = require('../../secret-config');
const { OAuth2Client } = require('google-auth-library');
const CustomHttpError = require('../custom-http-error');
const { HTTP_CODES, ERRORS } = require('../constant.js');
const { MESSAGES } = require('../constant');

const client = new OAuth2Client(SECRET_CONFIGS.GOOGLE_OAUTH_WEB_CLIENT_ID);

class GoogleOauthClientService {
  static async verifyIdToken(idToken) {
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: SECRET_CONFIGS.GOOGLE_OAUTH_WEB_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (!payload) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.UNAUTHORIZED, ERRORS.AUTHENTICATION_ERROR, MESSAGES.GOOGLE_SIGN_UP_FAILED));
      }
      const { email } = payload;
      return Promise.resolve({ email });
    } catch (err) {
      return Promise.reject(err);
    }
  }

}

module.exports = GoogleOauthClientService;
