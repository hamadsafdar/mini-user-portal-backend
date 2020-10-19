const express = require('express');
const router = express.Router();
const { ifExists } = require('../middlewares/operation-validators');
const applicationController = require('../controllers/application');

router.post('/', applicationController.create);

router.get('/:appId', ifExists, applicationController.getById);

router.delete('/:appId', ifExists, applicationController.remove);

//To add allowed groups

router.post('/groups', applicationController.allowGroups);

//To remove allowed groups

router.delete('/groups', applicationController.removeAllowedGroups);

//To get allowed groups

router.get('/groups/:appId', applicationController.getAllowedGroups);

router.get('/', applicationController.getAll);

module.exports = router;
