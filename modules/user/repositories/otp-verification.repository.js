'use strict';
const { models: { OTPVerification } } = require('../../../lib/models/index');

class OTPVerificationRepository {
  static async createOrUpdate(phoneNumber, code) {
    try {

      const otp = await OTPVerification.findOne({ where: { phoneNumber } });
      if (!otp) {
        await OTPVerification.create({ phoneNumber, code });
      } else {
        await OTPVerification.update({ code }, { where: { phoneNumber } });
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async get(phoneNumber, code) {
    try {
      const otp = await OTPVerification.findOne({ where: { phoneNumber, code } });
      return Promise.resolve(otp);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async delete(phoneNumber) {
    try {
      const result = await OTPVerification.destroy({ where: { phoneNumber } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = OTPVerificationRepository;
