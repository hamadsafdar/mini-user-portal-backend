const axios = require('axios').default;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const getInfo = () => {
	const url = 'https://182.180.51.47:444/api/rest/users';

	return axios.get(url);
};
module.exports = { getInfo };
