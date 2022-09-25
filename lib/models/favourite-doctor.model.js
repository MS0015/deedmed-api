'use strict';
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('FavouriteDoctor', {
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    doctorId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
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
    tableName: 'favourite_doctors',
    timestamps: true
  });
};
