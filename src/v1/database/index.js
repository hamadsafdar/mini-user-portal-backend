const ibmdb = require('ibm_db');
const connectionString = require('../config').db.url;
let connection;

const getInstance = () => {
    if (connection) {
        return connection;
    } else {
        try {
            connection = ibmdb.openSync(connectionString);
            console.log('Database connected!');
            return connection;
        } catch (error) {
            console.log(error);
        }
    }
};

const close = async () => {
    connection.closeSync();
};

process.on('exit', (code) => {
    close();
    console.log('Ending database connection!');
});

module.exports = {
    getInstance,
    close,
    table: {
        USER: `"MRJ92887"."USERS"`,
        GROUP: `"GROUPS"`,
        APPLICATION: `"APPLICATIONS"`,
        USER_GROUPS: `"USERGROUPS"`,
        APPLICATION_GROUPS: `"APPLICATIONGROUPS"`
    }
};
