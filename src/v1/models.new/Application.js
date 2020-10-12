const queries = require('../database/queries/application');

function Application({
    APP_NAME: name,
    DESCRIPTION: description,
    URL: url,
    allowedGroups = []
}) {
    this.name = name;
    this.description = description;
    this.url = url;
    this.allowedGroups = allowedGroups;
}

Application.prototype.save = async function () {
    try {
        const result = await queries.add(this);
        if (result instanceof Error) throw new Error(result);
        else return true;
    } catch (error) {
        return error;
    }
};

Application.prototype.delete = async function () {
    try {
        const result = await queries.removeById(this);
        if (result instanceof Error) throw new Error(result);
        else return true;
    } catch (error) {
        return error;
    }
};

/**
 * @param userId
 * @returns Applications granted to user
 */

Application.getGrantedAppilcations = async function (userId) {
    
    //TODO: match groups of applications with user groups and return granted application 
    return;
};

Application.prototype.update = async function (newOptions) {};

module.exports = Application;
