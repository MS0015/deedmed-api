'use strict';
const express = require('express');
const router = express.Router();
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');
const UserPatientController = require('../../user/controllers/user-patient.controller');
const AdminPatientController = require('../controllers/admin-patient.controller');

router.get('/', Authentication, Authorization([USER_TYPES.ADMIN]), AdminPatientController.getAll);
router.get('/:patientId', Authentication, Authorization([USER_TYPES.ADMIN]), UserPatientController.getById);
router.post('/', Authentication, Authorization([USER_TYPES.ADMIN]), AdminPatientController.addPatientByAdmin);

module.exports = router;
