'use strict';
const UserRepository = require('../repositories/user.repository');
const UserPatientRepository = require('../repositories/user-patient.repository');
const { v4: uuid } = require('uuid');
const Utils = require('../../../lib/utils');
const { USER_TYPES, MESSAGES, AWS_S3_EXPIRES } = require('../../../lib/constant');
const CustomHttpError = require('../../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../../lib/constant.js');
const UserService = require('./user.service');
const { AWS_S3_BUCKET_USERS_PROFILE_IMAGES } = require('../../../secret-config');
const StorageService = require('../../../lib/services/storage-service');
const s3 = new StorageService();

class UserPatientService {
  static async signUp(signUpData) {
    try {
      const { email, authProvider, password, phoneNumber, userType, name, otp, ...patientDetails } = signUpData;
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
      const patientData = {
        patientId: userId,
        name,
        ...patientDetails,
        createdBy: userId,
        updatedBy: userId,
      };
      await UserPatientRepository.create(patientData);
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
      const user = await UserRepository.getUserByEmailType(email, [{ userType: USER_TYPES.GUARDIAN }, { userType: USER_TYPES.PATIENT }]);
      if (!user) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.NOT_FOUND, ERRORS.NOT_FOUND_ERROR, MESSAGES.PATIENT_NOT_FOUND));
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

  static async getProfile(patientId) {
    try {
      const result = await UserPatientRepository.getProfile(patientId);
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
      const { email, phoneNumber, ...patientDetails } = payload;
      const updatedAt = Utils.getDate();
      if (email || phoneNumber || patientDetails.name) {
        const userData = {
          updatedAt
        };
        if (email) {
          userData.email = email;
        }
        if (phoneNumber) {
          userData.phoneNumber = phoneNumber;
        }
        if (patientDetails.name) {
          userData.username = patientDetails.name;
        }
        await UserRepository.update(userId, userData);
      }

      if (Object.keys(patientDetails).length !== 0) {
        const patientData = {
          ...patientDetails,
          updatedAt
        };
        await UserPatientRepository.update(userId, patientData);
      }
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAll() {
    try {
      const result = await UserPatientRepository.getAll();
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getById(patientId) {
    try {
      const result = await UserPatientRepository.getById(patientId);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = UserPatientService;
