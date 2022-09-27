'use strict';
const express = require('express');
const router = express.Router();
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');
const PharmacyOrderController = require('../../pharmacy-order/controllers/pharmacy-order.controller');
const AdminPharmacyOrderController = require('../controllers/admin-pharmacy-order.controller');

router.get('/:pharmacyOrderId', Authentication, Authorization([USER_TYPES.ADMIN]), PharmacyOrderController.getById);
router.get('/', Authentication, Authorization([USER_TYPES.ADMIN]), AdminPharmacyOrderController.getAllOrders);

module.exports = router;
