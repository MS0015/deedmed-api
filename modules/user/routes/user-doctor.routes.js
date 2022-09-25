'use strict';
const express = require('express');
const router = express.Router();
const UserDoctorController = require('../controllers/user-doctor.controller');
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');

router.post('/sign-up', UserDoctorController.signUp);
router.post('/sign-in', UserDoctorController.signIn);
router.post('/validate', UserDoctorController.validateExistingDoctors);

router.get('/profile', Authentication, Authorization([USER_TYPES.DOCTOR]), UserDoctorController.getProfile);
router.put('/profile', Authentication, Authorization([USER_TYPES.DOCTOR]), UserDoctorController.updateProfile);
router.get('/', Authentication, UserDoctorController.getAll);
router.get('/patients', Authentication, Authorization([USER_TYPES.DOCTOR]), UserDoctorController.getPatients);
router.get('/:doctorId', Authentication, UserDoctorController.getById);

module.exports = router;
