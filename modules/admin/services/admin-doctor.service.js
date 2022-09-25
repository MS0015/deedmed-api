'use strict';
const AdminDoctorRepository = require('../repositories/admin-doctor.repository');
const { AUTH_PROVIDER, USER_TYPES } = require('../../../lib/constant');
const UserRepository = require('../../user/repositories/user.repository');
const UserDoctorRepository = require('../../user/repositories/user-doctor.repository');
const { v4: uuid } = require('uuid');

class AdminDoctorService {

  static async getAll(offset, limit) {
    try {
      const result = await AdminDoctorRepository.getAll(offset, limit);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async addDoctorByAdmin(adminId, data) {
    try {
      const {
        email,
        phoneNumber,
        name,
        ...doctorDetails
      } = data;

      const doctorId = uuid();

      const userData = {
        userId: doctorId,
        email,
        authProvider: AUTH_PROVIDER.EMAIL_PASSWORD,
        username: name,
        phoneNumber,
        userType: USER_TYPES.DOCTOR,
        parentId: doctorId,
        createdBy: adminId,
        updatedBy: adminId,
      };

      await UserRepository.create(userData);

      const doctorData = {
        doctorId: doctorId,
        name,
        ...doctorDetails,
        createdBy: adminId,
        updatedBy: adminId,
      };

      await UserDoctorRepository.create(doctorData);

      return Promise.resolve({ doctorId });

    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = AdminDoctorService;
