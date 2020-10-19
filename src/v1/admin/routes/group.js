const express = require('express');
const router = express.Router();
const { ifExists } = require('../middlewares/operation-validators');
const groupController = require('../controllers/group');

router.post('/', groupController.create);

router.delete('/:groupId', ifExists, groupController.remove);

router.get('/:groupId', ifExists, groupController.get);

router.get('/members/:groupId', groupController.getMembers);

router.get('/', groupController.getAll);

module.exports = router;
