const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const dbConnect = require('./mongo');
//controllers
const userController = require('./controllers/user');
//initializing app
const app = express();

dbConnect();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());


app.post('/register', userController.register);
app.post('/authenticate', userController.authenticate);

app.get('/test', (req, res) => {
	res.json({
		message: 'Test is okay!'
	});
});

module.exports = app;
