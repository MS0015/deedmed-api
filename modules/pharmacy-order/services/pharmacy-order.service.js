'use strict';
const PharmacyOrderRepository = require('../repositories/pharmacy-order.repository');
const { v4: uuid } = require('uuid');
const StorageService = require('../../../lib/services/storage-service');
const s3 = new StorageService();
const SECRET_CONFIGS = require('../../../secret-config');
const { AWS_S3_EXPIRES, PHARMACY_ORDER_STATUS, MESSAGES } = require('../../../lib/constant');
const PATIENTS_APPOINTMENTS_PRESCRIPTIONS = SECRET_CONFIGS.AWS_S3_BUCKET_PATIENTS_APPOINTMENTS_PRESCRIPTIONS;
const UserPharmacyRepository = require('../../user/repositories/user-pharmacy.repository');
const CustomHttpError = require('../../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../../lib/constant.js');
const Utils = require('../../../lib/utils');

class PharmacyOrderService {
  static async create(userId, data) {
    try {
      const pharmacy = await UserPharmacyRepository.getById(data.pharmacyId);
      if (!pharmacy) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.NOT_FOUND, ERRORS.NOT_FOUND_ERROR, MESSAGES.PHARMACY_NOT_FOUND));
      }
      const pharmacyOrderId = uuid();
      const order = {
        pharmacyOrderId,
        patientId: userId,
        status: PHARMACY_ORDER_STATUS.PENDING,
        type: pharmacy.serviceArea,
        ...data,
        createdBy: userId,
        updatedBy: userId,
      };
      await PharmacyOrderRepository.create(order);
      return Promise.resolve({ pharmacyOrderId });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllByPatientId(patientId) {
    try {
      const orders = await PharmacyOrderRepository.getAllByPatientId(patientId);
      const newOrders = await this.downloadPrescriptions(orders);
      return Promise.resolve(newOrders);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAllByPharmacyId(pharmacyId) {
    try {
      const orders = await PharmacyOrderRepository.getAllByPharmacyId(pharmacyId);
      const newOrders = await this.downloadPrescriptions(orders);
      return Promise.resolve(newOrders);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async downloadPrescriptions(orders) {
    try {
      const newOrders = [];
      for (const order of orders) {
        if (order.prescriptions.length > 0 && !order.prescriptions.includes('')) {
          const prescriptionsUrls = [];
          for (const prescription of order.prescriptions) {
            const prescriptionUrl = await s3.getSignedUrl(PATIENTS_APPOINTMENTS_PRESCRIPTIONS, prescription, 'getObject', AWS_S3_EXPIRES.PATIENT_APPOINTMENT_PRESCRIPTION);
            prescriptionsUrls.push(prescriptionUrl);
          }
          order.prescriptions = prescriptionsUrls;
        }
        newOrders.push(order);
      }
      return Promise.resolve(newOrders);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getById(pharmacyOrderId) {
    try {
      const order = await PharmacyOrderRepository.getById(pharmacyOrderId);
      if (!order) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.NOT_FOUND, ERRORS.NOT_FOUND_ERROR, MESSAGES.PHARMACY_ORDER_NOT_FOUND));
      }
      return Promise.resolve(order);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async update(pharmacyOrderId, payload, userId) {
    try {
      const orderData = {
        ...payload,
        updatedBy: userId,
        updatedAt: Utils.getDate()
      };
      await PharmacyOrderRepository.update(pharmacyOrderId, orderData);
      return Promise.resolve({ pharmacyOrderId });
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = PharmacyOrderService;
