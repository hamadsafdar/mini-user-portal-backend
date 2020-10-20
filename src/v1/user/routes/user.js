const express = require('express');
const { authenticateToken } = require('../middlewares');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/authenticate', userController.authenticate);

router.get('/applications', userController.fetchApplications);

router.get('/', authenticateToken, userController.fetchUser);

module.exports = router;
