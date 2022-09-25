'use strict';
const express = require('express');
const router = express.Router();
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');
const PharmacyOrderController = require('../controllers/pharmacy-order.controller');

router.post('/patient', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT]), PharmacyOrderController.create);
router.get('/patient', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT]), PharmacyOrderController.getAllByPatientId);
router.get('/pharmacy', Authentication, Authorization([USER_TYPES.PHARMACY]), PharmacyOrderController.getAllByPharmacyId);
router.get('/:pharmacyOrderId', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT, USER_TYPES.PHARMACY]), PharmacyOrderController.getById);
router.put('/:pharmacyOrderId', Authentication, Authorization([USER_TYPES.PHARMACY]), PharmacyOrderController.update);

module.exports = router;
