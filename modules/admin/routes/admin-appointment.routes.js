'use strict';
const express = require('express');
const router = express.Router();
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');
const AdminAppointmentController = require('../controllers/admin-appointment.controller');
const AppointmentController = require('../../appointment/controllers/appointment.controller');

router.get('/patient/:patientId', Authentication, Authorization([USER_TYPES.ADMIN]), AdminAppointmentController.getByPatientId);
router.get('/doctor/:doctorId', Authentication, Authorization([USER_TYPES.ADMIN]), AdminAppointmentController.getByDoctorId);
router.put('/:appointmentId', Authentication, AdminAppointmentController.update);
router.get('/:appointmentId', Authentication, AppointmentController.getById);
router.get('/', Authentication, Authorization([USER_TYPES.ADMIN]), AdminAppointmentController.getAll);

module.exports = router;
