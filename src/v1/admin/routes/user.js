const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/', userController.create);

router.get('/', userController.getAll);

router.get('/:userId', userController.get);

router.delete('/:userId', userController.removeById);

router.get('/status/:userId', userController.changeStatus);

router.post('/membership/add', userController.addToGroup);

router.post('/membership/remove', userController.removeFromGroup);

router.get('/groups/:userId', userController.getGroups);

module.exports = router;
