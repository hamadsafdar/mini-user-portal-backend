const db = require('../index');
const connection = db.getInstance();

const tableName = db.table.GROUP;

const add = ({ name, description }) => {
    const query = `INSERT INTO ${tableName} (group_name, description) VALUES ('${name}', '${description}');`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

const removeById = (id) => {
    const query = `DELETE FROM ${tableName} WHERE group_id = ${id};`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

const getById = (id) => {
    const query = `SELECT * FROM ${tableName} WHERE group_id = ${id};`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

const modify = () => {};

const getAll = (limit, offset) => {
    const query = `SELECT * FROM ${tableName} ORDER BY group_id LIMIT ${limit} OFFSET ${offset};`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

module.exports = { add, removeById, getById, modify, getAll };
