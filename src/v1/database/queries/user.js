const db = require('../index');
const connection = db.getInstance();

const tableName = db.table.USER;

const add = ({ name, email, sAMAccountName, phoneNumber }) => {
    const query = `INSERT INTO ${tableName}(full_name, email, phone_number, sam_account_name) VALUES ('${name}', '${email}', '${phoneNumber}', '${sAMAccountName}');`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

const removeById = (id) => {
    const query = `DELETE FROM ${tableName} WHERE user_id = ${id};`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

const getById = (id) => {
    const query = `SELECT * FROM ${tableName} WHERE user_id = ${id};`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

const modify = () => {};

const getAll = (limit, offset) => {
    const query = `SELECT * FROM ${tableName} ORDER BY user_id LIMIT ${limit} OFFSET ${offset};`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

module.exports = { add, removeById, getById, modify, getAll };


