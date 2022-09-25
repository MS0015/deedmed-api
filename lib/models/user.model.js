'use strict';
const { Sequelize } = require('sequelize');
const { USER_TYPES } = require('../constant.js');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    authProvider: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    userType: {
      type: Sequelize.ENUM(USER_TYPES.ADMIN, USER_TYPES.GUARDIAN, USER_TYPES.PATIENT, USER_TYPES.GUARDIAN_PATIENT, USER_TYPES.DOCTOR, USER_TYPES.PHARMACY),
      allowNull: false
    },
    profileImagePath: {
      type: Sequelize.STRING
    },
    parentId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    createdBy: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    updatedBy: {
      type: Sequelize.UUID,
      allowNull: false,
    }
  }, {
    tableName: 'users',
    timestamps: true
  });
};
