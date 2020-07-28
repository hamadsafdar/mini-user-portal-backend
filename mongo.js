const mongoose = require('mongoose');
const db = require('./config').db;

mongoose.Promise = global.Promise;

const connect = async () => {
	try {
		await mongoose.connect(db.url, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log('Database Connected!');
	} catch (error) {
		console.log(error);
	}
};

module.exports = connect;
