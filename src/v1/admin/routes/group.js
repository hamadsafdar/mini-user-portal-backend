const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group');

router.post('/', groupController.create);

router.delete('/:groupId', groupController.remove);

router.get('/:groupId', groupController.get);

router.get('/', groupController.getAll);

router.patch('/', groupController.edit);

module.exports = router;
