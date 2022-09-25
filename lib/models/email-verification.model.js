'use strict';
const { Sequelize } = require('sequelize');
const { USER_TYPES } = require('../constant.js');

module.exports = (sequelize) => {
  return sequelize.define('EmailVerification', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    userType: {
      type: Sequelize.ENUM(USER_TYPES.ADMIN, USER_TYPES.GUARDIAN, USER_TYPES.PATIENT, USER_TYPES.GUARDIAN_PATIENT, USER_TYPES.DOCTOR, USER_TYPES.PHARMACY),
      allowNull: false
    },
    code: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  }, {
    tableName: 'email_verifications',
    timestamps: true
  });
};
