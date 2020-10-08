const express = require('express');
const router = express.Router();
const userRoutes = require('./routes/user');

router.use('/', userRoutes);

module.exports = router;
