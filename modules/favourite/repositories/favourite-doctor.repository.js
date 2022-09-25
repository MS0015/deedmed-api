'use strict';
const { models: { FavouriteDoctor, Doctor } } = require('../../../lib/models/index');
const CustomHttpError = require('../../../lib/custom-http-error');
const { HTTP_CODES, ERRORS } = require('../../../lib/constant.js');
const { MESSAGES } = require('../../../lib/constant');

class FavouriteDoctorRepository {
  static async addFavoriteDoctor(data) {
    try {
      const result = await FavouriteDoctor.create(data);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async removeFavoriteDoctor(userId, doctorId) {
    try {
      const result = await FavouriteDoctor.destroy({ where: { userId, doctorId } });
      if (!result) {
        return Promise.reject(new CustomHttpError(HTTP_CODES.BAD_REQUEST, ERRORS.NOT_FOUND_ERROR, MESSAGES.PATIENT_FAVOURITE_DOCTOR_NOT_FOUND));
      }
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getAll(userId) {
    try {
      const result = await FavouriteDoctor.findAll({
        where: { userId },
        attributes: ['doctorId'],
        include: [
          {
            model: Doctor,
            attributes: ['name', 'experienceYears']
          }
        ],
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getByDoctorId(doctorId) {
    try {
      const result = await FavouriteDoctor.findOne({
        where: { doctorId },
        attributes: ['doctorId'],
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = FavouriteDoctorRepository;
