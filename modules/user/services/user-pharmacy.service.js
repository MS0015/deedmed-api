'use strict';
const UserRepository = require('../repositories/user.repository');
const UserPharmacyRepository = require('../repositories/user-pharmacy.repository');
const { v4: uuid } = require('uuid');
const Utils = require('../../../lib/utils');
const { USER_TYPES, MESSAGES, AWS_S3_EXPIRES } = require('../../../lib/constant');
const CustomHttpError = require('../../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../../lib/constant.js');
const UserService = require('./user.service');
const FavouritePharmacyRepository = require('../../favourite/repositories/favourite-pharmacy.repository');
const { AWS_S3_BUCKET_USERS_PROFILE_IMAGES } = require('../../../secret-config');
const StorageService = require('../../../lib/services/storage-service');
const s3 = new StorageService();

class UserPharmacyService {
  static async register(registerData) {
    try {
      const {
        email,
        authProvider,
        password,
        phoneNumber,
        userType,
        businessName,
        otp,
        ...pharmacyDetails
      } = registerData;
      await UserService.validateOTP(phoneNumber, otp);
      const userId = uuid();
      const encryptedPassword = await Utils.getEncryptedPassword(password);
      const userData = {
        userId,
        email,
        authProvider,
        password: encryptedPassword,
        username: businessName,
        phoneNumber,
        userType,
        parentId: userId,
        createdBy: userId,
        updatedBy: userId,
      };
      await UserRepository.create(userData);
      const pharmacyData = {
        pharmacyId: userId,
        businessName,
        ...pharmacyDetails,
        createdBy: userId,
        updatedBy: userId,
      };
      await UserPharmacyRepository.register(pharmacyData);
      const token = await Utils.generateToken(userId, email, userType, businessName, userId);
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
      const user = await UserRepository.getUserByEmailType(email, [{ userType: USER_TYPES.PHARMACY }]);
      if (!user) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.NOT_FOUND, ERRORS.NOT_FOUND_ERROR, MESSAGES.PHARMACY_NOT_FOUND));
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

  static async getProfile(pharmacyId) {
    try {
      const result = await UserPharmacyRepository.getProfile(pharmacyId);
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
      const { email, phoneNumber, ...pharmacyDetails } = payload;
      const updatedAt = Utils.getDate();
      if (email || phoneNumber || pharmacyDetails.businessName) {
        const userData = {
          updatedAt
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
        await UserRepository.update(userId, userData);
      }

      if (Object.keys(pharmacyDetails).length !== 0) {
        const pharmacyData = {
          ...pharmacyDetails,
          updatedAt
        };
        await UserPharmacyRepository.update(userId, pharmacyData);
      }
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAll(userId, userType) {
    try {
      const pharmacies = await UserPharmacyRepository.getAll();
      if (userType === USER_TYPES.GUARDIAN || userType === USER_TYPES.PATIENT) {
        const favourites = await FavouritePharmacyRepository.getAll(userId);
        for (const pharmacy of pharmacies) {
          if (favourites.find(favourite => favourite.pharmacyId === pharmacy.pharmacyId)) {
            pharmacy.setDataValue('isFavourite', true);
          } else {
            pharmacy.setDataValue('isFavourite', false);
          }
        }
      }
      return Promise.resolve(pharmacies);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getById(pharmacyId, userId, userType) {
    try {
      const pharmacy = await UserPharmacyRepository.getById(pharmacyId);
      if (!pharmacy) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.NOT_FOUND, ERRORS.NOT_FOUND_ERROR, MESSAGES.PHARMACY_NOT_FOUND));
      }
      if (userType === USER_TYPES.GUARDIAN || userType === USER_TYPES.PATIENT) {
        const favourite = await FavouritePharmacyRepository.getByPharmacyId(pharmacyId);
        if (favourite) {
          pharmacy.setDataValue('isFavourite', true);
        } else {
          pharmacy.setDataValue('isFavourite', false);
        }
      }
      return Promise.resolve(pharmacy);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = UserPharmacyService;
