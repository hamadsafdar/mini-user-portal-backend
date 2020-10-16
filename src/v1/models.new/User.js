const queries = require('../database/queries/user');

function User({
    USER_ID: id,
    FULL_NAME: name,
    SAM_ACCOUNT_NAME: sAMAccountName,
    EMAIL: email,
    PHONE_NUMBER: phoneNumber,
    IS_ENABLED: status
}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.sAMAccountName = sAMAccountName;
    this.phoneNumber = phoneNumber;
    this.isEnabled = status;
}

User.prototype.save = async function () {
    return await queries.add(this);
};

User.prototype.addToGroup = async function (groupId) {
    return await queries.addToGroup(this.id, groupId);
};

User.prototype.removeFromGroups = async function (groupId) {
    return await queries.removeFromGroup(this.id, groupId);
};

User.prototype.update = async function (newOptions) {};

User.prototype.changeStatus = async function () {
    return await queries.changeStatus(this.id, this.isEnabled);
};

User.prototype.getGroups = async function () {
    return await queries.getGroups(this.id);
};

User.prototype.isMemberOf = async function (groupId) {
    return await queries.checkMembership(this.id, groupId);
};

User.findById = async function (userId) {
    try {
        const user = await queries.getById(userId);
        return await Promise.resolve(new User(user[0]));
    } catch (error) {
        Promise.reject(error);
    }

    return await queries.getById(userId);
};

User.find = async function (limit, offset) {
    try {
        const result = await queries.getAll(limit, offset);
        const count = await queries.getTotalRowsCount()[0].ROW_COUNT;
        if (result instanceof Error || count instanceof Error)
            throw new Error(result, count);
        else return { result, count };
    } catch (error) {
        return error;
    }
};

User.ifExists = async function (userId) {
    return await queries.ifExists(userId);
};

User.isMemberOf = async function (userId, groupId) {
    return await queries.checkMembership(userId, groupId);
};

User.delete = async function (userId) {
    return await queries.removeById(userId);
};

User.getGroups = async function (userId) {
    return await queries.getGroups(userId);
};

User.addToGroup = async function (userId, groupId) {
    return await queries.addToGroup(userId, groupId);
};

User.removeFromGroup = async function (userId, groupId) {
    return await queries.removeFromGroup(userId, groupId);
};

module.exports = User;
