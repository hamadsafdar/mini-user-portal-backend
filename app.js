const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

//database
const dbConnect = require('./database');
dbConnect();
//routes
const userRoutes = require('./routes/user');
const groupRoutes = require('./routes/group');
const applicationRoutes = require('./routes/application');
//initializing app
const app = express();
//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//User application routes will go below
app.use('/api/user', userRoutes);

//Following routes are for administrating purposes
app.use('/api/admin/group', groupRoutes);
app.use('/api/admin/application', applicationRoutes);

module.exports = app;
