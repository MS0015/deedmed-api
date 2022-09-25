'use strict';
const express = require('express');
const router = express.Router();
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');
const AvailabilityController = require('../../availability/controllers/availability.controller');

router.get('/:doctorId', Authentication, Authorization([USER_TYPES.ADMIN]), AvailabilityController.getForComingWeek);
router.get('/:doctorId/:date', Authentication, Authorization([USER_TYPES.ADMIN]), AvailabilityController.getForDate);

module.exports = router;
