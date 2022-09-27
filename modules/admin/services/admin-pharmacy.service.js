'use strict';
const AdminPharmacyRepository = require('../repositories/admin-pharmacy.repository');
const UserRepository = require('../../user/repositories/user.repository');
const UserPharmacyRepository = require('../../user/repositories/user-pharmacy.repository');
const { USER_TYPES, AUTH_PROVIDER } = require('../../../lib/constant');
const { v4: uuid } = require('uuid');
const Utils = require('../../../lib/utils');

class AdminPharmacyService {

  static async getAll(offset, limit, searchText, maxDeliveryDistanceFilter, serviceAreaFilter) {
    try {
      const result = await AdminPharmacyRepository.getAll(offset, limit, searchText, maxDeliveryDistanceFilter, serviceAreaFilter);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async addPharmacyByAdmin(data, adminId) {
    try {
      const {
        email,
        phoneNumber,
        businessName,
        ...pharmacyDetails
      } = data;

      const pharmacyId = uuid();

      const userData = {
        userId: pharmacyId,
        email,
        authProvider: AUTH_PROVIDER.EMAIL_PASSWORD,
        username: businessName,
        phoneNumber,
        userType: USER_TYPES.PHARMACY,
        parentId: pharmacyId,
        createdBy: adminId,
        updatedBy: adminId,
      };

      await UserRepository.create(userData);

      const pharmacyData = {
        pharmacyId,
        businessName,
        ...pharmacyDetails,
        createdBy: adminId,
        updatedBy: adminId,
      };
      await UserPharmacyRepository.register(pharmacyData);

      return Promise.resolve({ pharmacyId });

    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async updatePharmacyByAdmin(pharmacyId, data, adminId) {
    try {

      const { email, phoneNumber, ...pharmacyDetails } = data;

      const updatedAt = Utils.getDate();

      if (email || phoneNumber || pharmacyDetails.businessName) {
        const userData = {
          updatedAt,
          updatedBy: adminId
        };
        if (email) {
          userData.email = email;
        }
        if (phoneNumber) {
          userData.phoneNumber = phoneNumber;
        }
        if (pharmacyDetails.businessName) {
          userData.username = pharmacyDetails.businessName;
        }
        await UserRepository.update(pharmacyId, userData);
      }

      if (Object.keys(pharmacyDetails).length !== 0) {
        const pharmacyData = {
          ...pharmacyDetails,
          updatedAt,
          updatedBy: adminId
        };
        await UserPharmacyRepository.update(pharmacyId, pharmacyData);
      }

      return Promise.resolve(true);

    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = AdminPharmacyService;
