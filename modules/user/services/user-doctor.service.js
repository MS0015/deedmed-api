'use strict';
const UserRepository = require('../repositories/user.repository');
const UserDoctorRepository = require('../repositories/user-doctor.repository');
const AppointmentRepository = require('../../appointment/repositories/appointment.repository');
const { v4: uuid } = require('uuid');
const Utils = require('../../../lib/utils');
const CustomHttpError = require('../../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../../lib/constant.js');
const { MESSAGES, USER_TYPES, AWS_S3_EXPIRES } = require('../../../lib/constant');
const UserService = require('./user.service');
const FavouriteDoctorRepository = require('../../favourite/repositories/favourite-doctor.repository');
const { AWS_S3_BUCKET_USERS_PROFILE_IMAGES } = require('../../../secret-config');
const StorageService = require('../../../lib/services/storage-service');
const s3 = new StorageService();

class UserDoctorService {
  static async signUp(signUpData) {
    try {
      const {
        email,
        authProvider,
        password,
        phoneNumber,
        userType,
        name,
        otp,
        ...doctorDetails
      } = signUpData;
      await UserService.validateOTP(phoneNumber, otp);
      const userId = uuid();
      const encryptedPassword = await Utils.getEncryptedPassword(password);
      const userData = {
        userId,
        email,
        authProvider,
        password: encryptedPassword,
        username: name,
        phoneNumber,
        userType,
        parentId: userId,
        createdBy: userId,
        updatedBy: userId,
      };
      await UserRepository.create(userData);
      const doctorData = {
        doctorId: userId,
        name,
        ...doctorDetails,
        createdBy: userId,
        updatedBy: userId,
      };
      await UserDoctorRepository.create(doctorData);
      const token = await Utils.generateToken(userId, email, userType, name, userId);
      return Promise.resolve({ token });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async signIn(signInData) {
    try {
      const {
        email,
        password
      } = signInData;
      const user = await UserRepository.getUserByEmailType(email, [{ userType: USER_TYPES.DOCTOR }]);
      if (!user) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.NOT_FOUND, ERRORS.NOT_FOUND_ERROR, MESSAGES.DOCTOR_NOT_FOUND));
      }
      const isValidPassword = await Utils.isValidPassword(password, user.password);
      if (!isValidPassword) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.INVALID_CREDENTIALS));
      }
      const token = await Utils.generateToken(user.userId, email, user.userType, user.username, user.parentId);
      return Promise.resolve({ token });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getProfile(doctorId) {
    try {
      const result = await UserDoctorRepository.getProfile(doctorId);
      if (result.User.profileImagePath) {
        const profileImageUrl = await s3.getSignedUrl(AWS_S3_BUCKET_USERS_PROFILE_IMAGES, result.User.profileImagePath, 'getObject', AWS_S3_EXPIRES.USER_PROFILE_IMAGE);
        result.getDataValue('User').setDataValue('profileImageUrl', profileImageUrl);
      }
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async updateProfile(userId, payload) {
    try {
      const { email, phoneNumber, ...doctorDetails } = payload;
      const updatedAt = Utils.getDate();
      if (email || phoneNumber || doctorDetails.name) {
        const userData = {
          updatedAt
        };
        if (email) {
          userData.email = email;
        }
        if (phoneNumber) {
          userData.phoneNumber = phoneNumber;
        }
        if (doctorDetails.name) {
          userData.username = doctorDetails.name;
        }
        await UserRepository.update(userId, userData);
      }

      if (Object.keys(doctorDetails).length !== 0) {
        const doctorData = {
          ...doctorDetails,
          updatedAt
        };
        await UserDoctorRepository.update(userId, doctorData);
      }
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAll(userId, userType) {
    try {
      const doctors = await UserDoctorRepository.getAll();
      if (userType === USER_TYPES.GUARDIAN || userType === USER_TYPES.PATIENT) {
        const favourites = await FavouriteDoctorRepository.getAll(userId);
        for (const doctor of doctors) {
          if (favourites.find(favourite => favourite.doctorId === doctor.doctorId)) {
            doctor.setDataValue('isFavourite', true);
          } else {
            doctor.setDataValue('isFavourite', false);
          }
        }
      }
      return Promise.resolve(doctors);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getPatients(doctorId) {
    try {
      const result = await AppointmentRepository.getAppointmentPatients(doctorId);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getById(doctorId, userId, userType) {
    try {
      const doctor = await UserDoctorRepository.getById(doctorId);
      if (!doctor) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.NOT_FOUND, ERRORS.NOT_FOUND_ERROR, MESSAGES.DOCTOR_NOT_FOUND));
      }
      if (userType === USER_TYPES.GUARDIAN || userType === USER_TYPES.PATIENT) {
        const favourite = await FavouriteDoctorRepository.getByDoctorId(doctorId);
        if (favourite) {
          doctor.setDataValue('isFavourite', true);
        } else {
          doctor.setDataValue('isFavourite', false);
        }
      }
      return Promise.resolve(doctor);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = UserDoctorService;
