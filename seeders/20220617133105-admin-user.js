'use strict';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { v4: uuid } = require('uuid');
const { USER_TYPES, AUTH_PROVIDER } = require('../lib/constant');
const SECRET_CONFIGS = require('../secret-config');
const Utils = require('../lib/utils');

module.exports = {
  async up(queryInterface, Sequelize) {
    const userId = uuid();
    const encryptedPassword = await Utils.getEncryptedPassword(SECRET_CONFIGS.ADMIN_PASSWORD);
    return queryInterface.bulkInsert('users', [{
      userId,
      email: SECRET_CONFIGS.ADMIN_EMAIL,
      authProvider: AUTH_PROVIDER.EMAIL_PASSWORD,
      password: encryptedPassword,
      username: SECRET_CONFIGS.ADMIN_USERNAME,
      phoneNumber: SECRET_CONFIGS.ADMIN_PHONE_NUMBER,
      userType: USER_TYPES.ADMIN,
      parentId: userId,
      createdBy: userId,
      updatedBy: userId,
      createdAt: Utils.getDate(),
      updatedAt: Utils.getDate()
    }]);
  },

  async down(queryInterface, Sequelize) {
    const encryptedPassword = await Utils.getEncryptedPassword(SECRET_CONFIGS.ADMIN_PASSWORD);
    return queryInterface.bulkDelete('users', {
      email: SECRET_CONFIGS.ADMIN_EMAIL,
      authProvider: AUTH_PROVIDER.EMAIL_PASSWORD,
      password: encryptedPassword,
      username: SECRET_CONFIGS.ADMIN_USERNAME,
      phoneNumber: SECRET_CONFIGS.ADMIN_PHONE_NUMBER,
    });
  }
};
