'use strict';
const FavouriteDoctorRepository = require('../repositories/favourite-doctor.repository');
const FavouritePharmacyRepository = require('../repositories/favourite-pharmacy.repository');

class FavouriteService {
  static async addFavoriteDoctor(userId, doctorId) {
    try {
      const data = { userId, doctorId, createdBy: userId, updatedBy: userId };
      await FavouriteDoctorRepository.addFavoriteDoctor(data);
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async removeFavoriteDoctor(userId, doctorId) {
    try {
      await FavouriteDoctorRepository.removeFavoriteDoctor(userId, doctorId);
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getFavoriteDoctors(userId) {
    try {
      const result = await FavouriteDoctorRepository.getAll(userId);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async addFavoritePharmacy(userId, pharmacyId) {
    try {
      const data = { userId, pharmacyId, createdBy: userId, updatedBy: userId };
      await FavouritePharmacyRepository.addFavoritePharmacy(data);
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async removeFavoritePharmacy(userId, pharmacyId) {
    try {
      await FavouritePharmacyRepository.removeFavoritePharmacy(userId, pharmacyId);
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getFavoritePharmacies(userId) {
    try {
      const result = await FavouritePharmacyRepository.getAll(userId);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

module.exports = FavouriteService;
