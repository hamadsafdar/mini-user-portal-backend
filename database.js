const mongoose = require('mongoose');
const { db } = require('./src/v1/config');

mongoose.Promise = global.Promise;

module.exports = () => {
    mongoose
        .connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => console.log('Database Connected!'))
        .catch((err) => console.log(err));
};
