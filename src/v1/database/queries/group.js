const User = require('../../models/User');
const db = require('../index');
const connection = db.getInstance();

const { GROUP, USER } = db.table;

const add = ({ name, description }) => {
    const query = `INSERT INTO ${GROUP} 
                        (group_name, description) 
                    VALUES 
                        ('${name}', '${description}');`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
};

const removeById = (id) => {
    const query = `DELETE FROM ${GROUP} WHERE group_id = ${id};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
};

const getById = (id) => {
    const query = `SELECT * FROM ${GROUP} WHERE group_id = ${id};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            else resolve(rows[0]);
        });
    });
};

const modify = () => {};

const getAll = (limit, offset) => {
    const query = `SELECT * FROM ${GROUP} ORDER BY group_id LIMIT ${limit} OFFSET ${offset};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            resolve(true);
        });
    });
};

const getMembers = (userId) => {
    let query = `
    SELECT ${USER}.user_id, ${USER}.user_name, ${USER}.email FROM  ${USER} 
        INNER JOIN ${USER_GROUPS} 
            ON ${USER_GROUPS}.user_id = ${USER}.user_id 
        INNER JOIN ${GROUP}
            ON ${GROUP}.group_id = ${USER_GROUPS}.group_id 
        WHERE ${USER}.user_id = ${userId};
    `;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            // if (err) {
            //     reject(err);
            // } else {
            //     resolve(rows);
            // }
            reject(new Error('Look into query'));
        });
    });
};

const getTotalCount = () => {
    let query = `SELECT COUNT(*) ROW_COUNT FROM ${GROUP};`;
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

module.exports = {
    add,
    removeById,
    getById,
    modify,
    getAll,
    getMembers,
    getTotalCount
};
