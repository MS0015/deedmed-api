'use strict';
const express = require('express');
const router = express.Router();

const NotificationController = require('../controllers/notification.controller');

// TODO: Implement Authentication, Authorization
router.post('/create', NotificationController.create);

module.exports = router;