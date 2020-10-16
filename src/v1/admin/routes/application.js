const express = require('express');
const router = express.Router();
const { ifExists } = require('../middlewares/operation-validators');
const applicationController = require('../controllers/application');
const applicationController2 = require('../controllers.new/application');

router.post('/', applicationController2.create);

router.get('/:appId', ifExists, applicationController2.getById);

router.delete('/:appId', ifExists, applicationController2.remove);

router.get('/', applicationController.getAll);

router.patch('/', applicationController.edit);

module.exports = router;
