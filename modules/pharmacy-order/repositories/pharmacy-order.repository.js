'use strict';
const { models: { PharmacyOrder, Patient, Pharmacy } } = require('../../../lib/models/index');

class PharmacyOrderRepository {
  static async create(data) {
    try {
      const result = await PharmacyOrder.create(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllByPatientId(patientId) {
    try {
      const result = await PharmacyOrder.findAll({
        where: { patientId },
        attributes: {
          exclude: ['PatientPatientId', 'PharmacyPharmacyId']
        },
        include: [
          {
            model: Patient,
            attributes: {
              exclude: ['UserUserId']
            },
          }
        ],
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllByPharmacyId(pharmacyId) {
    try {
      const result = await PharmacyOrder.findAll({
        where: { pharmacyId },
        attributes: {
          exclude: ['PatientPatientId', 'PharmacyPharmacyId']
        },
        include: [
          {
            model: Pharmacy,
            attributes: {
              exclude: ['UserUserId']
            },
          }
        ],
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getById(pharmacyOrderId) {
    try {
      const result = await PharmacyOrder.findOne({
        where: { pharmacyOrderId },
        attributes: {
          exclude: ['PatientPatientId', 'PharmacyPharmacyId']
        },
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async update(pharmacyOrderId, data) {
    try {
      const result = await PharmacyOrder.update(data, { where: { pharmacyOrderId } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = PharmacyOrderRepository;
