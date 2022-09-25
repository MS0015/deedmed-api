'use strict';
const express = require('express');
const router = express.Router();
const AvailabilityController = require('../controllers/availability.controller');
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');

router.post('/doctor/add', Authentication, Authorization([USER_TYPES.DOCTOR]), AvailabilityController.addAvailability);
router.get('/doctor/get', Authentication, Authorization([USER_TYPES.DOCTOR]), AvailabilityController.getAvailability);

router.get('/patient/get/:doctorId', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT]), AvailabilityController.getForComingWeek);
router.get('/patient/get/:doctorId/:date', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT, USER_TYPES.DOCTOR]), AvailabilityController.getForDate);

module.exports = router;
