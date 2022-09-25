'use strict';
const AdminPatientRepository = require('../repositories/admin-patient.repository');
const Utils = require('../../../lib/utils');
const { AUTH_PROVIDER } = require('../../../lib/constant');
const UserRepository = require('../../user/repositories/user.repository');
const UserPatientRepository = require('../../user/repositories/user-patient.repository');
const { v4: uuid } = require('uuid');

class AdminPatientService {

  static async getAll(offset, limit) {
    try {
      const result = await AdminPatientRepository.getAll(offset, limit);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async addPatientByAdmin(adminId, data) {
    try {
      const { email, password, phoneNumber, name, userType, ...patientDetails } = data;

      const patientId = uuid();

      const encryptedPassword = await Utils.getEncryptedPassword(password);

      const userData = {
        userId: patientId,
        email,
        authProvider: AUTH_PROVIDER.EMAIL_PASSWORD,
        password: encryptedPassword,
        username: name,
        phoneNumber,
        userType,
        parentId: patientId,
        createdBy: adminId,
        updatedBy: adminId,
      };

      await UserRepository.create(userData);

      const patientData = {
        patientId,
        name,
        ...patientDetails,
        createdBy: adminId,
        updatedBy: adminId,
      };

      await UserPatientRepository.create(patientData);

      return Promise.resolve({ patientId });

    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = AdminPatientService;
