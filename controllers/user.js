const User = require('../models/User');
const UserInfo = require('../models/UserBio');
const jwt = require('jsonwebtoken');
const { getInfo } = require('../services/info');
const { secret: secret_key } = require('../config');

async function authenticate(req, res) {
	const { username, password } = req.body;
	let user;
	try {
		user = await User.findOne({ username: username }).exec();
	} catch (error) {
		res.status(500).json({
			message: 'INTERNAL_ERROR'
		});
	}

	if (user) {
		if (user.password === password) {
			const token = jwt.sign({ username: username }, secret_key, {
				algorithm: 'HS256'
			});
			return res.status(200).json({
				token: token,
				isAuthenticated: true
			});
		} else {
			return res.status(401).json({
				isAuthenticated: false,
				message: 'INVALID_CREDS'
			});
		}
	} else {
		return res.status(400).json({
			isAuthenticated: false,
			message: 'INVALID_CREDS'
		});
	}
}

function register(req, res) {
	const { username, password } = req.body;
	console.log(req.body);
	const user = new User({
		username: username,
		password: password
	});

	user.save()
		.then((stored) => {
			res.status(201).json({
				isSuccessful: true
			});
		})
		.catch((err) => {
			res.status(500).json({
				isSuccessful: false
			});
		});
}

async function fetchUserInfo() {
	let response, data;
	try {
		response = await getInfo();

		data = JSON.parse(response.data.replace(/ 0+(?![\. }])/g, ' '));
	} catch (error) {
		console.log(error, 'okay');
	}

	const infoArr = data.map((user) => {
		const userInfo = new Info(user);
		userInfo.formatUndefined();
		userInfo.formatLocation();
		return userInfo;
	});
	res.send(infoArr);
}

module.exports = {
	authenticate,
	register,
	fetchUserInfo
};
