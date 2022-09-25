'use strict';
const express = require('express');
const router = express.Router();
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');
const TestOrderController = require('../controllers/test-order.controller');

router.post('/doctor', Authentication, Authorization([USER_TYPES.DOCTOR]), TestOrderController.create);
router.get('/patient/:appointmentId', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT]), TestOrderController.get);

module.exports = router;
