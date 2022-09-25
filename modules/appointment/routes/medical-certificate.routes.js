'use strict';
const express = require('express');
const router = express.Router();
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');
const MedicalCertificateController = require('../controllers/medical-certificate.controller');

router.post('/doctor', Authentication, Authorization([USER_TYPES.DOCTOR]), MedicalCertificateController.create);

module.exports = router;
