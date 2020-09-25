const mongoose = require('mongoose');
const { db } = require('./config');

mongoose.Promise = global.Promise;

module.exports = () => {
    mongoose
        .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Database Connected!'))
        .catch((err) => console.log(err));
};
