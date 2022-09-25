'use strict';
const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('FavouritePharmacy', {
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    pharmacyId: {
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
    tableName: 'favourite_pharmacies',
    timestamps: true
  });
};
