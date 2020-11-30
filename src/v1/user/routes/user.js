const express = require('express');
const { authenticateToken, checkUserSynced } = require('../middlewares');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/authenticate', checkUserSynced, userController.authenticate);

router.get(
    '/applications',
    authenticateToken,
    userController.fetchApplications
);

router.get('/', authenticateToken, userController.fetchUser);

module.exports = router;
