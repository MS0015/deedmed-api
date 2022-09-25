'use strict';
const OTPVerificationRepository = require('../repositories/otp-verification.repository');
const EmailVerificationRepository = require('../repositories/email-verification.repository');
const UserRepository = require('../repositories/user.repository');
const Utils = require('../../../lib/utils');
const SMSService = require('../../../lib/services/sms-service');
const { FIELDS, MESSAGES, AUTH_PROVIDER } = require('../../../lib/constant');
const CustomHttpError = require('../../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../../lib/constant.js');
const GoogleOAuth2ClientService = require('../../../lib/services/google-oauth-client-service');
const FacebookAuthService = require('../../../lib/services/facebook-auth-service');
const EmailService = require('../../../lib/services/email-service');
const fs = require('fs');
const SECRET_CONFIGS = require('../../../secret-config');
const AWS_S3_BUCKET_USERS_PROFILE_IMAGES = SECRET_CONFIGS.AWS_S3_BUCKET_USERS_PROFILE_IMAGES;
const StorageService = require('../../../lib/services/storage-service');
const s3 = new StorageService();

class UserService {
  static async sendOTP(phoneNumber) {
    try {
      phoneNumber = '94' + parseInt(phoneNumber, 10);
      const code = Utils.generateFourDigitCode();
      const message = `Your DeedMed verification code is: ${code}`;
      await SMSService.sendSMS(phoneNumber, message);
      await OTPVerificationRepository.createOrUpdate(phoneNumber, code)
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async validateExistingUsers(email, phoneNumber) {
    try {
      const user = await UserRepository.getUserByEmailOrPhoneNumber(email, phoneNumber);
      if (!user) {
        return Promise.resolve({ isExisting: false });
      } else {
        if (user.email === email) {
          return Promise.resolve({ isExisting: true, field: FIELDS.EMAIL });
        } else {
          return Promise.resolve({ isExisting: true, field: FIELDS.PHONE_NUMBER });
        }
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async validateOTP(phoneNumber, code) {
    try {
      phoneNumber = '94' + parseInt(phoneNumber, 10);
      const otp = await OTPVerificationRepository.get(phoneNumber, code);
      if (!otp) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.INVALID_OTP));
      }
      if (Utils.isExpiredByMinutes(otp.updatedAt, 2)) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.EXPIRED_OTP));
      }
      await OTPVerificationRepository.delete(phoneNumber);
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async signUpGoogle(token) {
    try {
      const { email } = await GoogleOAuth2ClientService.verifyIdToken(token);
      const user = await UserRepository.getUserByEmail(email);
      if (user) {
        return Promise.resolve(false);
      } else {
        return Promise.resolve(true);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async signInGoogle(token, userTypes) {
    try {
      const { email } = await GoogleOAuth2ClientService.verifyIdToken(token);
      const user = await UserRepository.getUserByEmailTypes(email, userTypes);
      if (!user) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.NOT_FOUND, ERRORS.NOT_FOUND_ERROR, MESSAGES.USER_NOT_FOUND));
      }
      const token = await Utils.generateToken(user.userId, email, user.userType, user.username, user.parentId);
      return Promise.resolve({ token });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async signUpFacebook(token) {
    try {
      const { email } = await FacebookAuthService.verifyToken(token);
      const user = await UserRepository.getUserByEmail(email);
      if (user) {
        return Promise.resolve(false);
      } else {
        return Promise.resolve(true);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async signInFacebook(token, userTypes) {
    try {
      const { email } = await FacebookAuthService.verifyToken(token);
      const user = await UserRepository.getUserByEmailTypes(email, userTypes);
      if (!user) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.NOT_FOUND, ERRORS.NOT_FOUND_ERROR, MESSAGES.USER_NOT_FOUND));
      }
      const token = await Utils.generateToken(user.userId, email, user.userType, user.username, user.parentId);
      return Promise.resolve({ token });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async forgotPassword(email, userTypes) {
    try {
      const user = await UserRepository.getUserByEmailTypesAuthProvider(email, userTypes, AUTH_PROVIDER.EMAIL_PASSWORD);
      if (!user) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.NOT_FOUND, ERRORS.NOT_FOUND_ERROR, MESSAGES.USER_NOT_FOUND));
      }
      const code = Utils.generateFourDigitCode();
      await EmailVerificationRepository.createOrUpdate(email, userTypes, code);
      await EmailService.sendForgotPasswordEmail(email, code);
      return Promise.resolve(code);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async verifyEmailCode(email, userTypes, code) {
    try {
      const verification = await EmailVerificationRepository.get(email, userTypes, code);
      if (!verification) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.INVALID_EMAIL_VERIFICATION_CODE));
      }
      if (Utils.isExpiredByMinutes(verification.updatedAt, 30)) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.EXPIRED_EMAIL_VERIFICATION_CODE));
      }
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async updatePassword(email, userTypes, code, password) {
    try {
      const verification = await EmailVerificationRepository.get(email, userTypes, code);
      if (!verification) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.INVALID_EMAIL_VERIFICATION_CODE));
      }
      const encryptedPassword = await Utils.getEncryptedPassword(password);
      await UserRepository.updatePassword(email, encryptedPassword);
      await EmailVerificationRepository.delete(email);
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async updateProfileImage(userId, file) {
    try {
      if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
        return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.VALIDATION_ERROR, MESSAGES.INVALID_FILE_FORMAT_IMAGE));
      }
      const key = userId + '.' + file.originalname.split('.')[1];
      const imageBuffer = new Buffer.from(fs.readFileSync(file.path).toString('base64'), 'base64');
      await s3.upload(AWS_S3_BUCKET_USERS_PROFILE_IMAGES, key, imageBuffer);
      fs.unlinkSync(file.path);
      await UserRepository.updateProfileImagePath(userId, key);
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = UserService;
