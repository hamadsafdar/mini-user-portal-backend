const db = require('../index');
const connection = db.getInstance();

const { USER, GROUP, USER_GROUPS } = db.table;

const add = ({ name, email, sAMAccountName, phoneNumber }) => {
    const query = `INSERT INTO ${USER}(full_name, email, phone_number, sam_account_name) VALUES ('${name}', '${email}', '${phoneNumber}', '${sAMAccountName}');`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

/**
 * This function removes a user against given ID
 * @param {Number} id - User's ID
 * @returns {Array | Error } empty array if successful or error if fails
 */

const removeById = (id) => {
    const query = `DELETE FROM ${USER} WHERE user_id = ${id};`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

/**
 * This function returns single user against given ID
 * @param {Number} id - User's ID
 * @returns {Object | Error} User or error if fails
 */

const getById = (id) => {
    const query = `SELECT * FROM ${USER} WHERE user_id = ${id};`;
    try {
        return connection.querySync(query)[0];
    } catch (error) {
        return error;
    }
};

const modify = () => {};

/**
 * This function, if called with limit and offset, skips offset rows and returns limited rows.
 * If called without any parameters, returns all the rows of the User table.
 * @param {Number} [limit] - Number of rows to returned
 * @param {Number} [offset] - Number of rows to skip
 * @returns {Array | Error}  Array of rows or error if fails
 */

const getAll = (limit, offset) => {
    let query = `SELECT * FROM ${USER} ORDER BY user_id`;
    if (limit && offset) {
        query = `${query} LIMIT ${limit} OFFSET ${offset};`;
    }
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

const changeStatus = (id, status) => {
    const query = `UPDATE ${USER} SET is_enabled = ${!status} WHERE user_id = ${id};`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

/**
 * This function returns row count of the table User
 * @returns {Array | Error}
 */

const getTotalRowsCount = () => {
    let query = `SELECT COUNT(*) ROW_COUNT FROM ${USER}`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

/**
 *
 * @param {Number} userId
 * @returns {Array | Error } array of Groups or error if fails
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
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

/**
 * This function adds user to group against user's and group's ID
 * @param {Number} userId - ID of user
 * @param {Number} groupId - ID of group
 * @returns {Array | Error } empty array if successful or error if fails
 */

const addToGroup = (userId, groupId) => {
    const query = `INSERT INTO "${USER_GROUPS}" (user_id, group_id) VALUES ("${userId}", "${groupId}");`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

/**
 * This function removes user from group against user's and group's ID
 * @param {Number} userId
 * @param {Number} groupId
 * @returns {Array | Error } empty array if successful or error if fails
 */

const removeFromGroup = (userId, groupId) => {
    const query = `DELETE FROM ${USER_GROUPS} WHERE user_id = ${userId} AND group_id = ${groupId} ;`;
    try {
        return connection.querySync(query);
    } catch (error) {
        return error;
    }
};

module.exports = {
    add,
    removeById,
    getById,
    modify,
    getAll,
    changeStatus,
    getTotalRowsCount
};
