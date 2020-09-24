const ActiveDirectory = require('activedirectory2').promiseWrapper;
const { ad: adConfig } = require('./config');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
let instance;

const getInstance = () => {
    if (!instance) {
        instance = new ActiveDirectory({
            url: adConfig.url,
            baseDN: adConfig.baseDn,
            username: adConfig.username,
            password: adConfig.password
        });
        return instance;
    } else return instance;
};

module.exports = getInstance;
