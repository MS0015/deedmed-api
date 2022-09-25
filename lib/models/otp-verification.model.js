'use strict';
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('OTPVerification', {
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  }, {
    tableName: 'otp_verifications',
    timestamps: true
  });
};
