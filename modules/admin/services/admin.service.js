'use strict';
const UserRepository = require('../../user/repositories/user.repository');
const Utils = require('../../../lib/utils');
const CustomHttpError = require('../../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../../lib/constant.js');
const { MESSAGES, USER_TYPES } = require('../../../lib/constant');

class AdminService {
  static async signIn(signInData) {
    try {
      const {
        email,
        password
      } = signInData;
      const user = await UserRepository.getUserByEmailType(email, [{ userType: USER_TYPES.ADMIN }]);
      if (!user) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.NOT_FOUND, ERRORS.NOT_FOUND_ERROR, MESSAGES.ADMIN_NOT_FOUND));
      }
      const isValidPassword = await Utils.isValidPassword(password, user.password);
      if (!isValidPassword) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.INVALID_CREDENTIALS));
      }
      const token = await Utils.generateToken(user.userId, email, user.userType, user.username, user.parentId);
      return Promise.resolve({ token });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = AdminService;
