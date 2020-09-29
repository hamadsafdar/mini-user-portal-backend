const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/', userController.create);

router.get('/', userController.getAll);

router.get('/:userId', userController.get);

router.delete('/:userId', userController.remove);

router.post('/group/add', userController.addUserToGroup);

router.post('/group/remove', userController.removeUserFromGroup);

module.exports = router;
