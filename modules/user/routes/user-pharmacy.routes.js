'use strict';
const express = require('express');
const router = express.Router();
const UserPharmacyController = require('../controllers/user-pharmacy.controller');
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');

router.post('/register', UserPharmacyController.register);
router.post('/sign-in', UserPharmacyController.signIn);
router.post('/validate', UserPharmacyController.validateExistingPharmacies);

router.get('/profile', Authentication, Authorization([USER_TYPES.PHARMACY]), UserPharmacyController.getProfile);
router.put('/profile', Authentication, Authorization([USER_TYPES.PHARMACY]), UserPharmacyController.updateProfile);
router.get('/', Authentication, UserPharmacyController.getAll);
router.get('/:pharmacyId', Authentication, UserPharmacyController.getById);

module.exports = router;
