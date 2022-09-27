'use strict';
const express = require('express');
const router = express.Router();
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');
const UserDoctorController = require('../../user/controllers/user-doctor.controller');
const AdminDoctorController = require('../controllers/admin-doctor.controller');

router.get('/:doctorId', Authentication, Authorization([USER_TYPES.ADMIN]), UserDoctorController.getById);
router.put('/:doctorId', Authentication, Authorization([USER_TYPES.ADMIN]), AdminDoctorController.updateByAdmin);
router.get('/', Authentication, Authorization([USER_TYPES.ADMIN]), AdminDoctorController.getAll);
router.post('/', Authentication, Authorization([USER_TYPES.ADMIN]), AdminDoctorController.addDoctorByAdmin);

module.exports = router;
