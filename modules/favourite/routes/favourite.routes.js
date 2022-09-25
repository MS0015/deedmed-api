'use strict';
const express = require('express');
const router = express.Router();
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');
const FavouriteController = require('../controllers/favourite.controller');

router.get('/patient/add-doctor/:doctorId', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT]), FavouriteController.addFavoriteDoctor);
router.delete('/patient/remove-doctor/:doctorId', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT]), FavouriteController.removeFavoriteDoctor);
router.get('/patient/get-doctors', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT]), FavouriteController.getFavoriteDoctors);

router.get('/patient/add-pharmacy/:pharmacyId', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT]), FavouriteController.addFavoritePharmacy);
router.delete('/patient/remove-pharmacy/:pharmacyId', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT]), FavouriteController.removeFavoritePharmacy);
router.get('/patient/get-pharmacies', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT]), FavouriteController.getFavoritePharmacies);


module.exports = router;
