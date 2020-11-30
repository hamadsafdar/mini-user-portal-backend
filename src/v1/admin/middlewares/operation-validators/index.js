const Application = require('../../../models/Application');
const Group = require('../../../models/Group');
const User = require('../../../models/User');
const { customFailResponse } = require('../../../util').responseGenerator;
const { getNotIncludedProperties } = require('./user');
const path = {
    USER: '/api/v1/admin/user',
    GROUP: '/api/v1/admin/group',
    APP: '/api/v1/admin/application'
};

async function ifExists(req, res, next) {
    if (req.params.appId) {
        const result = await Application.isExists(req.params.appId);
        if (result) next();
        else return customFailResponse(res, 'NO_SUCH_APPLICATION_FOUND', 400);
    } else if (req.params.userId) {
        const result = await User.isExists(req.params.userId);
        if (result) next();
        else return customFailResponse(res, 'NO_SUCH_USER_FOUND', 400);
    } else if (req.params.groupId) {
        const result = await Group.isExists(req.params.groupId);
        if (result) next();
        else return customFailResponse(res, 'NO_SUCH_GROUP_FOUND', 400);
    }
}

function addResourceValidator(req, res, next) {
    if (req.path.includes(path.USER)) {
        const user = req.body;
        const propertiesNotIncluded = getNotIncludedProperties(user);
        if (propertiesNotIncluded.length > 0) {
            res.status(400).json({
                message: 'INCOMPLETE_PROPERTIES',
                propertiesNotIncluded
            });
        } else next();
    }
}

async function checkUnique(req, res, next) {
    const user = req.body;
    const report = await User.getUniqueReport(user);
    if (report.isUnique) next();
    else {
        res.status(400).json({
            message: 'NOT_UNIQUE',
            report
        });
    }
}

module.exports = { ifExists, addResourceValidator, checkUnique };
