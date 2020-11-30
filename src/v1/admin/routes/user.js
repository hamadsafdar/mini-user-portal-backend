const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/', userController.create);

router.delete('/membership', userController.removeFromGroup);

router.get('/', userController.getAll);

router.get('/:userId', userController.get);

router.delete('/:userId', userController.removeById);

router.put('/status/:userId', userController.changeStatus);

router.post('/membership', userController.addToGroup);

router.get('/membership/:userId', userController.getGroups);

module.exports = router;
