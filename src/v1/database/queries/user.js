const db = require('../index');
const connection = db.getInstance();
const { USER, GROUP, USER_GROUPS } = db.table;

const add = ({ name, email, sAMAccountName, phoneNumber }) => {
    const query = `INSERT INTO ${USER} 
                        (full_name, email, phone_number, sam_account_name) 
                    VALUES 
                        ('${name}', '${email}', '${phoneNumber}', '${sAMAccountName}');`;

    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
};

const removeById = (id) => {
    const query = `DELETE FROM ${USER} WHERE user_id = ${id};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
};

const getById = (id) => {
    const query = `SELECT * FROM ${USER} WHERE user_id = ${id};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) {
                reject(err);
            } else if (rows.length > 0) {
                resolve(rows[0]);
            } else reject(new Error('NO_SUCH_USER'));
        });
    });
};

const modify = () => {};

const getAll = (limit, offset) => {
    const query = `SELECT * FROM ${USER} ORDER BY user_id LIMIT ${limit} OFFSET ${offset};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const changeStatus = (id, status) => {
    const query = `UPDATE ${USER} SET is_enabled = ${!status} WHERE user_id = ${id};`;
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
    let query = `SELECT COUNT(*) ROW_COUNT FROM ${USER}`;
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

const getGroups = (userId) => {
    let query = `
    SELECT ${GROUP}.group_id, ${GROUP}.group_name, ${GROUP}.description FROM  ${USER} 
        INNER JOIN ${USER_GROUPS} 
            ON ${USER_GROUPS}.user_id = ${USER}.user_id 
        INNER JOIN ${GROUP}
            ON ${GROUP}.group_id = ${USER_GROUPS}.group_id 
        WHERE ${USER}.user_id = ${userId};
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

const addToGroup = (userId, groupIdArr) => {
    let query = `INSERT INTO ${USER_GROUPS} (user_id, group_id) VALUES `;
    userId = parseInt(userId);
    groupIdArr.forEach((groupId) => {
        groupId = parseInt(groupId);
        query += `(${userId}, ${groupId}), `;
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

const removeFromGroup = (userId, groupId) => {
    const query = `DELETE FROM ${USER_GROUPS} WHERE user_id = ${userId} AND group_id IN (${groupId.join(', ')}) ;`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};

// For validation purposes

const checkMembership = (userId, groupId) => {
    const query = `SELECT * FROM ${USER_GROUPS} WHERE user_id = ${userId} AND group_id = ${groupId};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                if (rows.length === 1) resolve(true);
                else resolve(false);
            }
        });
    });
};

const ifExists = (userId) => {
    const query = `SELECT * FROM ${USER} WHERE user_id = ${userId};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                if (rows.length === 1) resolve(true);
                else resolve(false);
            }
        });
    });
};

//For end user

const getGrantedApplications = (userId) => {
    const userGroupQuery = `SELECT group_id FROM ${USER_GROUPS} WHERE user_id = ${userId};`;
    const appGroupQuery = `SELECT app_id`;
};

module.exports = {
    add,
    removeById,
    getById,
    modify,
    getAll,
    changeStatus,
    getTotalCount,
    getGroups,
    addToGroup,
    removeFromGroup,
    checkMembership,
    ifExists
};
