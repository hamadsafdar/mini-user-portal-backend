const { table } = require('../database');
const db = require('../database');
const connection = db.getInstance();

const insert = (table) => (columnNames, values) => {
    const query = `INSERT INTO ${table} (${columnNames.join(
        ', '
    )}) VALUES (${values.join(', ')});`;
    return connection.querySync(query);
};

const remove = (table) => (constraint, value) => {
    const query = `DELETE FROM ${table} WHERE ${constraint} = ${value};`;
    return connection.querySync(query);
};

const fetchAll = (table) => (limit, offset, orderByConstraint) => {
    let selectQuery = `SELECT * FROM ${table}`;
    if (limit && offset && orderByConstraint)
        selectQuery =
            selectQuery +
            ` ORDERED BY ${orderByConstraint} LIMIT ${limit} OFFSET ${offset};`;
    const countQuery = `SELECT COUNT(*) ROW_COUNT FROM ${table};`;
    const result = connection.querySync(selectQuery);
    const totalRows = +connection.querySync(countQuery)[0].ROW_COUNT;
    return result instanceof Error || totalRows instanceof Error
        ? new Error('Error while fetching records')
        : { result, totalRows };
};

const ifUserExists = (email) => {
    const query = `SELECT * FROM Users WHERE email = '${email}';`;
    const result = connection.querySync(query);
    return result instanceof Error
        ? result
        : result.length === 0
        ? false
        : true;
};

const ifApplicationExists = (name) => {
    const query = `SELECT * FROM Applications WHERE app_name = '${name}';`;
    const result = connection.querySync(query);
    return result instanceof Error
        ? result
        : result.length === 0
        ? false
        : true;
};

const ifGroupExists = (name) => {
    const query = `SELECT * FROM Groups WHERE group_name = '${name}';`;
    const result = connection.querySync(query);
    return result instanceof Error
        ? result
        : result.length === 0
        ? false
        : true;
};

const fetchUsers = fetchAll('Groups');

console.log(fetchUsers());
