const queries = require('../database/queries/group');
const User = require('../models/User');

function Group({
    GROUP_ID: id = null,
    GROUP_NAME: name,
    DESCRIPTION: description
}) {
    this.id = id;
    this.name = name;
    this.description = description;
}

Group.prototype.save = async function () {
    return await queries.add(this);
};

Group.getMembers = async function (groupId) {
    try {
        const members = await queries.getMembers(groupId);
        const users = members.map((member) => new User(member));
        return Promise.resolve(users);
    } catch (error) {
        return Promise.reject(error);
    }

    // return await queries.getMembers(groupId);
};

Group.findById = async function (groupId) {
    try {
        const group = await queries.getById(groupId);
        return Promise.resolve(new Group(group));
    } catch (error) {
        return Promise.reject(error);
    }
};

Group.removeById = async function (groupId) {
    return await queries.removeById(groupId);
};

Group.isExists = async function (groupId) {
    return await queries.exists(groupId);
};

Group.find = async function (limit, offset) {
    try {
        const groups = await queries.getAll(limit, offset);
        const mGroups = groups.map((group) => new Group(group));
        return Promise.resolve(mGroups);
    } catch (error) {
        return Promise.reject(error);
    }
};
module.exports = Group;
