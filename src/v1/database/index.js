const ibmdb = require('ibm_db');
const connectionString = `DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-04.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=mrj92887;PWD=8-m5zbvn2p7j07dl;`;
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
        USER: `"MRJ92887"."USERS"`,
        GROUP: '',
        APPLICATION: ''
    }
};
