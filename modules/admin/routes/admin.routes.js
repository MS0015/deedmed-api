'use strict';
const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');

router.post('/sign-in', AdminController.signIn);
router.post('/forgot-password', AdminController.forgotPassword);
router.post('/verify-email-code', AdminController.verifyEmailCode);
router.post('/update-password', AdminController.updatePassword);

module.exports = router;
