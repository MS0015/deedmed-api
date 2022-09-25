'use strict';
const express = require('express');
const router = express.Router();
const AdminCategoryController = require('../controllers/admin-category.controller');
const upload = require('../../../lib/middlewares/file-upload');
const Authentication = require('../../../lib/middlewares/authentication');
const Authorization = require('../../../lib/middlewares/authorization');
const { USER_TYPES } = require('../../../lib/constant');

router.post('/', Authentication, Authorization([USER_TYPES.ADMIN]), upload.single('file'), AdminCategoryController.create);
router.get('/', AdminCategoryController.getAll);

module.exports = router;
