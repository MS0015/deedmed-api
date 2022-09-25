'use strict';
const { models: { MedicalCertificate } } = require('../../../lib/models/index');

class MedicalCertificateRepository {
  static async create(data) {
    try {
      const result = await MedicalCertificate.create(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = MedicalCertificateRepository;
