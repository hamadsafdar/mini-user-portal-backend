const db = require('../index');
const connection = db.getInstance();

const tableName = db.table.APPLICATION;

const add = ({ name, description, url }) => {
    const query = `INSERT INTO ${tableName}(app_name, description) VALUES ('${name}', '${description}', '${url}');`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

const removeById = (id) => {
    const query = `DELETE FROM ${tableName} WHERE app_id = ${id};`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

const getById = (id) => {
    const query = `SELECT * FROM ${tableName} WHERE app_id = ${id};`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

const modify = () => {};

const getAll = (limit, offset) => {
    const query = `SELECT * FROM ${tableName} ORDER BY app_id LIMIT ${limit} OFFSET ${offset};`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

module.exports = { add, removeById, getById, modify, getAll };
