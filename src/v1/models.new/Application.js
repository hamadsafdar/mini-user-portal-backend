const queries = require('../database/queries/application');

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

Application.getGrantedAppilcations = async function (userId) {
    //TODO: match groups of applications with user groups and return granted application
    return;
};

Application.prototype.update = async function (newOptions) {};

Application.delete = async function (appId) {
    return await queries.removeById(appId);
};

Application.find = async function () {
    try {
        const application = await queries.getById(appId);
    } catch (error) {}
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

module.exports = Application;
