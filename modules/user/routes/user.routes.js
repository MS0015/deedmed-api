'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const upload = require('../../../lib/middlewares/file-upload');
const Authentication = require('../../../lib/middlewares/authentication');

router.post('/send-otp', UserController.sendOTP);
router.post('/validate', UserController.validateExistingUsers);
router.post('/sign-up/google', UserController.signUpGoogle);
router.post('/sign-in/google', UserController.signInGoogle);
router.post('/sign-up/facebook', UserController.signUpFacebook);
router.post('/sign-in/facebook', UserController.signInFacebook);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/verify-email-code', UserController.verifyEmailCode);
router.post('/update-password', UserController.updatePassword);
router.post('/update-profile-image', Authentication, upload.single('file'), UserController.updateProfileImage);

module.exports = router;
