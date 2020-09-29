const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/', userController.authenticate);

router.get('/', authenticateToken, userController.fetchUser);

module.exports = router;
