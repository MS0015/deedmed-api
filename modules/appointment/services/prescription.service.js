'use strict';
const PrescriptionRepository = require('../repositories/prescription.repository');
const { v4: uuid } = require('uuid');

class PrescriptionService {
  static async bulkCreate(userId, dataArray) {
    try {
      const prescriptions = [];
      const prescriptionIds = [];
      for (const item of dataArray) {
        const prescriptionId = uuid();
        prescriptionIds.push(prescriptionId);
        const prescriptionData = {
          prescriptionId,
          ...item,
          createdBy: userId,
          updatedBy: userId,
        };
        prescriptions.push(prescriptionData);
      }
      await PrescriptionRepository.bulkCreate(prescriptions);
      return Promise.resolve({ prescriptionIds });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = PrescriptionService;
