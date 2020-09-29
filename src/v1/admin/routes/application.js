const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application');

router.post('/', applicationController.create);

router.delete('/:appId', applicationController.remove);

router.get('/', applicationController.getAll);

router.get('/:appId', applicationController.get);

router.patch('/', applicationController.edit);

module.exports = router;
