'use strict';
const express = require('express');
const router = express.Router();
const UserPatientController = require('../controllers/user-patient.controller');
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');

router.post('/sign-up', UserPatientController.signUp);
router.post('/sign-in', UserPatientController.signIn);
router.post('/validate', UserPatientController.validateExistingPatients);

router.get('/profile', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT]), UserPatientController.getProfile);
router.put('/profile', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT]), UserPatientController.updateProfile);
router.get('/', Authentication, UserPatientController.getAll);
router.get('/:patientId', Authentication, UserPatientController.getById);

module.exports = router;
