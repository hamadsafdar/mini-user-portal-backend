const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group');

router.post('/', groupController.create);

router.delete('/:groupId', groupController.remove);

router.get('/', groupController.getAll);

module.exports = router;
