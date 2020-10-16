const user = require('../../admin/controllers.new/user');
const { collection } = require('../../models/User');
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

/**
 * This function removes a user against given ID
 * @param {Number} id - User's ID
 * @returns {Promise} empty array if successful or error if fails
 */

const removeById = async (id) => {
    const query = `DELETE FROM ${USER} WHERE user_id = ${id};`;
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) reject(err);
            resolve(true);
        });
    });
};

/**
 * This function returns single user against given ID
 * @param {Number} id - User's ID
 * @returns {Object | Error} User or error if fails
 */

const getById = (id) => {
    const query = `SELECT * FROM ${USER} WHERE user_id = ${id};`;
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

const modify = () => {};

/**
 * This function, if called with limit and offset, skips offset rows and returns limited rows.
 * If called without any parameters, returns all the rows of the User table.
 * @param {Number} [limit] - Number of rows to returned
 * @param {Number} [offset] - Number of rows to skip
 * @returns {Array | Error}  Array of rows or error if fails
 */

const getAll = async (limit, offset) => {
    let query = `SELECT * FROM ${USER} ORDER BY user_id`;
    if (limit && offset) {
        query = `${query} LIMIT ${limit} OFFSET ${offset};`;
    }
    return await connection.queryAsync(query);
};

const changeStatus = (id, status) => {
    const query = `UPDATE ${USER} SET is_enabled = ${!status} WHERE user_id = ${id};`;
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

/**
 * This function returns row count of the table User
 * @returns {Array | Error}
 */

const getTotalCount = async () => {
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

/**
 *
 * @param {Number} userId
 * @returns {Promise} array of Groups or error if fails
 */

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

/**
 * This function adds user to group against user's and group's ID
 * @param {Number} userId - ID of user
 * @param {Number[]} groupId - ID of group
 * @returns {Promise} empty array if successful or error if fails
 */

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

/**
 * This function removes user from group against user's and group's ID
 * @param {Number} userId
 * @param {Number} groupId
 * @returns {Promise} empty array if successful or error if fails
 */

const removeFromGroup = async (userId, groupId) => {
    const query = `DELETE FROM ${USER_GROUPS} WHERE user_id = ${userId} AND group_id = ${groupId} ;`;
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
