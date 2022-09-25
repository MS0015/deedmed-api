'use strict';
const MedicalCertificateRepository = require('../repositories/medical-certificate.repository');
const { v4: uuid } = require('uuid');

class MedicalCertificateService {
  static async create(userId, data) {
    try {
      const medicalCertificateId = uuid();
      const certificateData = {
        medicalCertificateId,
        ...data,
        createdBy: userId,
        updatedBy: userId,
      };
      await MedicalCertificateRepository.create(certificateData);
      return Promise.resolve({ medicalCertificateId });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = MedicalCertificateService;
