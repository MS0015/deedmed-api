'use strict';
const { models: { EmailVerification } } = require('../../../lib/models/index');
const { USER_TYPES } = require('../../../lib/constant');

class EmailVerificationRepository {
  static async createOrUpdate(email, userTypes, code) {
    try {
      const otp = await EmailVerification.findOne({ where: { email, userType: userTypes } });
      if (!otp) {
        const userType = userTypes.length > 1 ? USER_TYPES.PATIENT : userTypes[0];
        await EmailVerification.create({ email, userType, code });
      } else {
        await EmailVerification.update({ code }, { where: { email, userType: otp.userType } });
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async get(email, userTypes, code) {
    try {
      const otp = await EmailVerification.findOne({ where: { email, userType: userTypes, code } });
      return Promise.resolve(otp);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async delete(email) {
    try {
      const result = await EmailVerification.destroy({ where: { email } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = EmailVerificationRepository;
