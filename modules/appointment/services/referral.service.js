'use strict';
const ReferralRepository = require('../repositories/referral.repository');
const { v4: uuid } = require('uuid');

class ReferralService {
  static async create(userId, data) {
    try {
      const referralId = uuid();
      const referralData = {
        referralId,
        ...data,
        createdBy: userId,
        updatedBy: userId,
      };
      await ReferralRepository.create(referralData);
      return Promise.resolve({ referralId });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = ReferralService;
