'use strict';
const express = require('express');
const router = express.Router();
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');
const AdminPharmacyController = require('../controllers/admin-pharmacy.controller');
const UserPharmacyController = require('../../user/controllers/user-pharmacy.controller');

router.get('/:pharmacyId', Authentication, Authorization([USER_TYPES.ADMIN]), UserPharmacyController.getById);
router.get('/', Authentication, Authorization([USER_TYPES.ADMIN]), AdminPharmacyController.getAll);
router.post('/', Authentication, Authorization([USER_TYPES.ADMIN]), AdminPharmacyController.addPharmacyByAdmin);
router.put('/:pharmacyId', Authentication, Authorization([USER_TYPES.ADMIN]), AdminPharmacyController.updatePharmacyByAdmin);

module.exports = router;
