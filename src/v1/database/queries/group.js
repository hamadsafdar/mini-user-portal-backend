const db = require('../index');
const connection = db.getInstance();

const { GROUP, USER, USER_GROUPS } = db.table;

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

const exists = (groupId) => {
    const query = `SELECT * FROM ${GROUP} WHERE group_id = ${groupId};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            else resolve(rows.length === 0 ? false : true);
        });
    });
};

const getAll = (limit, offset) => {
    const query = `SELECT * FROM ${GROUP} ORDER BY group_id LIMIT ${limit} OFFSET ${offset};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const getMembers = (groupId) => {
    let query = `
    SELECT 
        ${USER}.user_id,
        ${USER}.full_name,
        ${USER}.email,
        ${USER}.sam_account_name,
        ${USER}.phone_number
    FROM ${GROUP}
        INNER JOIN ${USER_GROUPS}
            ON ${USER_GROUPS}.group_id = ${GROUP}.group_id
        INNER JOIN ${USER}
        ON ${USER}.user_id = ${USER_GROUPS}.user_id
    WHERE 
        ${GROUP}.group_id = ${groupId}
    `;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
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
    getTotalCount,
    exists
};
