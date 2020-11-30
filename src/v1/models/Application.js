const queries = require('../database/queries/application');
const Group = require('./Group');
function Application({
    APP_ID: id,
    APP_NAME: name,
    DESCRIPTION: description,
    URL: url
}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
}

Application.prototype.save = async function () {
    return await queries.add(this);
};

Application.prototype.delete = async function () {
    return await queries.removeById(this.id);
};

Application.prototype.update = async function (newOptions) {};

Application.delete = async function (appId) {
    return await queries.removeById(appId);
};

Application.find = async function (limit, offset) {
    try {
        const applications = await queries.getAll(limit, offset);
        const apps = applications.map(
            (application) => new Application(application)
        );
        return Promise.resolve(apps);
    } catch (error) {
        return Promise.reject(error);
    }
};

Application.findById = async function (appId) {
    try {
        const application = await queries.getById(appId);
        const app = new Application(application);
        return Promise.resolve(app);
    } catch (error) {
        return Promise.reject(error);
    }
};

Application.allowGroups = async function (appId, groupIdArr) {
    return await queries.allowGroups(appId, groupIdArr);
};

Application.removeAllowedGroups = async function (appId, groupIdArr) {
    return await queries.removeAllowedGroups(appId, groupIdArr);
};

Application.isExists = async function (appId) {
    return await queries.exists(appId);
};

Application.getAllowedGroups = async function (appId) {
    try {
        const allowedGroups = await queries.getAllowedGroups(appId);
        const groups = allowedGroups.map((group) => new Group(group));
        return Promise.resolve(groups);
    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports = Application;
