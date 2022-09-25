'use strict';
const express = require('express');
const router = express.Router();
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');
const ReferralController = require('../controllers/referral.controller');

router.post('/doctor', Authentication, Authorization([USER_TYPES.DOCTOR]), ReferralController.create);

module.exports = router;
