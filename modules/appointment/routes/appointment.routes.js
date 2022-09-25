'use strict';
const express = require('express');
const router = express.Router();
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');
const AppointmentController = require('../controllers/appointment.controller');
const upload = require('../../../lib/middlewares/file-upload');

router.post('/patient', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT, USER_TYPES.DOCTOR]), upload.array('files'), AppointmentController.create);
router.put('/patient/:appointmentId', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT, USER_TYPES.DOCTOR]), upload.array('files'), AppointmentController.update);
router.get('/patient', Authentication, Authorization([USER_TYPES.GUARDIAN, USER_TYPES.PATIENT]), AppointmentController.getByPatientId);
router.get('/doctor', Authentication, Authorization([USER_TYPES.DOCTOR]), AppointmentController.getByDoctorId);
router.get('/:appointmentId', Authentication, AppointmentController.getById);

module.exports = router;
