const ibmdb = require('ibm_db');
const connectionString = require('../config').db.url;
let connection;

const getInstance = () => {
    if (connection) {
        return connection;
    } else {
        try {
            connection = ibmdb.openSync(connectionString);
            console.log('Database Connected!');
            return connection;
        } catch (error) {
            console.log(error);
        }
    }
};

const close = () => {
    try {
        connection.closeSync();
        console.log('Connection Closed!');
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getInstance,
    close,
    table: {
        USER: `"USERS"`,
        GROUP: `"GROUPS"`,
        APPLICATION: `"APPLICATIONS"`,
        USER_GROUPS: `"USERGROUPS"`,
        APPLICATION_GROUPS: `"APPLICATIONGROUPS"`
    }
};
