'use strict';
const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/payment.controller');

// TODO: Implement Authentication, Authorization
router.post('/create', PaymentController.create);
router.post('/confirmation', PaymentController.paymentConfirmation);
router.get('/:secHash', PaymentController.getPaymentInfo);

module.exports = router;