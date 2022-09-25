'use strict';
const express = require('express');
const router = express.Router();
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');
const PrescriptionController = require('../controllers/prescription.controller');

router.post('/doctor', Authentication, Authorization([USER_TYPES.DOCTOR]), PrescriptionController.bulkCreate);

module.exports = router;
