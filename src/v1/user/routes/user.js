const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/authenticate', userController.authenticate);

router.get('/', authenticateToken, userController.fetchUser);

/////////////////Admin Routes////////////////
//TODO: Admin token authentication middleware

router.post('/', userController.create);

module.exports = router;
