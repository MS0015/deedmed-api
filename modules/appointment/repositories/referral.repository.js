'use strict';
const { models: { Referral } } = require('../../../lib/models/index');

class ReferralRepository {
  static async create(data) {
    try {
      const result = await Referral.create(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = ReferralRepository;
