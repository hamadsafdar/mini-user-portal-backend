const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/', userController.create);

router.get('/', userController.getAll);

router.patch('/', userController.edit);

router.get('/:userId', userController.get);

router.delete('/:userId', userController.remove);

router.post('/status/:userId', userController.changeStatus);

router.post('/membership/add', userController.addUserToGroup);

router.post('/membership/remove', userController.removeUserFromGroup);

module.exports = router;
