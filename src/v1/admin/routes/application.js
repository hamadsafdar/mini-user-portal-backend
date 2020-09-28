const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application');

router.post('/', applicationController.create);

router.delete('/:appId', applicationController.remove);

router.get('/', applicationController.getAll);

module.exports = router;
