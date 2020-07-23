const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
//initializing app
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/test', (req, res) => {
    res.json({
        message: 'Test is okay!'
    });
});

module.exports = app;
