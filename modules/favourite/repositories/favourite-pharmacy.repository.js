'use strict';
const { models: { FavouritePharmacy, Pharmacy } } = require('../../../lib/models/index');
const CustomHttpError = require('../../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../../lib/constant.js');
const { MESSAGES } = require('../../../lib/constant');

class FavouritePharmacyRepository {
  static async addFavoritePharmacy(data) {
    try {
      const result = await FavouritePharmacy.create(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async removeFavoritePharmacy(userId, pharmacyId) {
    try {
      const result = await FavouritePharmacy.destroy({ where: { userId, pharmacyId } });
      if (!result) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.NOT_FOUND_ERROR, MESSAGES.PATIENT_FAVOURITE_PHARMACY_NOT_FOUND));
      }
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAll(userId) {
    try {
      const result = await FavouritePharmacy.findAll({
        where: { userId },
        attributes: ['pharmacyId'],
        include: [
          {
            model: Pharmacy,
            attributes: ['businessName']
          }
        ],
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getByPharmacyId(pharmacyId) {
    try {
      const result = await FavouritePharmacy.findOne({
        where: { pharmacyId },
        attributes: ['pharmacyId'],
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = FavouritePharmacyRepository;
