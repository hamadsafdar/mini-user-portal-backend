const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

//database
require('./database')();

//routes
const v1AdminRoutes = require('./src/v1/admin/routes');
const v1UserRoutes = require('./src/v1/user/routes');
//initializing app
const app = express();
//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/admin', v1AdminRoutes);
app.use('/api/v1/user', v1UserRoutes);

module.exports = app;
