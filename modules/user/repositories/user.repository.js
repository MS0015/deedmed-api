'use strict';
const { models: { User } } = require('../../../lib/models/index');
const { Op } = require('sequelize');

class UserRepository {
  static async create(userData) {
    try {
      const result = await User.create(userData);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getUserByEmailType(email, userType) {
    try {
      const result = await User.findOne({
        where: {
          email,
          [Op.or]: userType
        }
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getUserByEmailOrPhoneNumber(email, phoneNumber) {
    try {
      const result = await User.findOne({
        where: {
          [Op.or]: {
            email,
            phoneNumber
          }
        }
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async update(userId, data) {
    try {
      const result = await User.update(data, { where: { userId } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getUserByEmail(email) {
    try {
      const result = await User.findOne({
        where: {
          email
        }
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getUserByEmailTypes(email, userTypes) {
    try {
      const result = await User.findOne({
        where: {
          email,
          userType: userTypes
        }
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getUserByEmailTypesAuthProvider(email, userTypes, authProvider) {
    try {
      const result = await User.findOne({
        where: {
          email,
          userType: userTypes,
          authProvider
        }
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async updatePassword(email, password) {
    try {
      const result = await User.update({ password }, { where: { email } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async updateProfileImagePath(userId, profileImagePath) {
    try {
      const result = await User.update({ profileImagePath }, { where: { userId } });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = UserRepository;
