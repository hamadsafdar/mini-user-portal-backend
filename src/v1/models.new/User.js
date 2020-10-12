const queries = require('../database/queries/user');

function User({
    USER_ID: id,
    FULL_NAME: name,
    SAM_ACCOUNT_NAME: sAMAccountName,
    EMAIL: email,
    PHONE_NUMBER: phoneNumber,
    STATUS: status
}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.sAMAccountName = sAMAccountName;
    this.phoneNumber = phoneNumber;
    this.isEnabled = status;
    this.groups = groups;
}

User.prototype.save = async function () {
    try {
        const result = await queries.add(this);
        if (result instanceof Error) throw result;
        else return true; //represents sucessful execution of query
    } catch (error) {
        return error;
    }
};

User.prototype.delete = async function () {
    try {
        const result = await queries.removeById(this.id);
        if (result instanceof Error) throw result;
        else return true;
    } catch (error) {
        return error;
    }
};

User.prototype.changeStatus = async function () {
    try {
        const result = await queries.changeStatus(this.id, this.isEnabled);
        if (result instanceof Error) throw result;
        else return true;
    } catch (error) {
        return error;
    }
};

User.prototype.getGroups = async function () {};

User.prototype.update = async function (newOptions) {};

User.findById = async function (userId) {
    try {
        const result = await queries.getById(userId);
        if (result instanceof Error) throw result;
        else return result;
    } catch (error) {
        return error;
    }
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

module.exports = User;
