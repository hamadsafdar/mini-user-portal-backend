const express = require('express');
const userRoutes = require('./routes/user');
const groupRoutes = require('./routes/group');
const appRoutes = require('./routes/application');

const router = express.Router({ mergeParams: true });

router.use('/user', userRoutes);

router.use('/group', groupRoutes);

router.use('/application', appRoutes);

module.exports = router;
