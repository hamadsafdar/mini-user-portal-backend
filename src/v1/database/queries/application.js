const db = require('../index');
const connection = db.getInstance();

const { APPLICATION, APPLICATION_GROUPS } = db.table;

const add = ({ name, description, url }) => {
    const query = `INSERT INTO ${APPLICATION}
                        (app_name, description, url) 
                    VALUES 
                        ('${name}', '${description}', '${url}');`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
};

const removeById = (id) => {
    const query = `DELETE FROM ${APPLICATION} WHERE app_id = ${id};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
};

const getById = (id) => {
    const query = `SELECT * FROM ${APPLICATION} WHERE app_id = ${id};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            else resolve(rows[0]);
        });
    });
};

const modify = () => {};

const getAll = (limit, offset) => {
    const query = `SELECT * FROM ${APPLICATION} ORDER BY app_id LIMIT ${limit} OFFSET ${offset};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const allowGroups = (appId, groupIdArr) => {
    let query = `INSERT INTO ${APPLICATION_GROUPS} (app_id, group_id) VALUES `;
    appId = parseInt(appId);
    groupIdArr.forEach((groupId) => {
        groupId = parseInt(groupId);
        query += `(${appId}, ${groupId}), `;
    });
    //removing ',' at the end of string
    query = query.substr(0, query.length - 2);
    query += ';';
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};

const removeAllowedGroups = (appId, groupIdArr) => {
    const query = `DELETE FROM ${APPLICATION_GROUPS} WHERE app_id = ${appId} AND group_id IN (${groupIdArr.join(
        ', '
    )});`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};

const getTotalCount = () => {
    let query = `SELECT COUNT(*) ROW_COUNT FROM ${APPLICATION}`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            // if (err) {
            //     reject(err);
            // } else {
            //     resolve(rows);
            // }
            reject(new Error('Look in to definition'));
        });
    });
};

const getAllowedGroups = () => {};

const exists = (appId) => {
    const query = `SELECT * FROM ${APPLICATION} WHERE app_id = ${appId};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            else resolve(rows.length === 0 ? false : true);
        });
    });
};

module.exports = {
    add,
    removeById,
    getById,
    modify,
    getAll,
    allowGroups,
    removeAllowedGroups,
    getTotalCount,
    getAllowedGroups,
    exists
};
