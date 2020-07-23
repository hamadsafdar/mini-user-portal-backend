const mongoose = require('mongoose');
const Shcema = mongoose.Schema;

const userSchema = new Shcema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

module.exports = mongoose.model('user', userSchema);
