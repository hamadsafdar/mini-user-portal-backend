const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const userController2 = require('../controllers.new/user');

router.post('/', userController2.create);

router.get('/', userController.getAll);

router.patch('/', userController.edit);

router.get('/:userId', userController2.get);

router.delete('/:userId', userController2.removeById);

router.get('/status/:userId', userController2.changeStatus);

router.post('/membership/add', userController2.addToGroup);

router.post('/membership/remove', userController2.removeFromGroup);

router.get('/groups/:userId', userController2.getGroups);

module.exports = router;
