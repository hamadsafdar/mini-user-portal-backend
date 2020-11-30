const Application = require('../../models/Application');

const {
    internalErrorResponse,
    customFailResponse,
    successResponse
} = require('../../util').responseGenerator;

async function create(req, res) {
    const { name, url, description } = req.body;
    const application = new Application({
        APP_ID: null,
        APP_NAME: name,
        URL: url,
        DESCRIPTION: description
    });
    try {
        await application.save();
        return res.status(201).json({
            message: 'APPLICATION_CREATED'
        });
    } catch (error) {
        console.log(error);
        return internalErrorResponse(res);
    }
}

async function remove(req, res) {
    const { appId } = req.params;
    try {
        await Application.delete(appId);
        return successResponse(res, 'APPLICATION_DELETED');
    } catch (error) {
        return internalErrorResponse(res);
    }
}

async function getById(req, res) {
    const { appId } = req.params;
    try {
        const application = await Application.findById(appId);
        const allowedGroups = await Application.getAllowedGroups(appId);
        return res.json({
            application,
            allowedGroups
        });
    } catch (error) {
        console.log(error);
        return internalErrorResponse(res);
    }
}

async function getAll(req, res) {
    const { iteration } = req.query;
    const LIMIT = 20;
    let offset = 0;
    offset = LIMIT * (parseInt(iteration) - 1);

    try {
        const applications = await Application.find(LIMIT, offset);
        return res.status(200).json({
            applications
        });
    } catch (error) {
        console.log(error);
        return internalErrorResponse(res);
    }
}

async function allowGroups(req, res) {
    const { appId, groupIdArr } = req.body;
    try {
        await Application.allowGroups(appId, groupIdArr);
        return successResponse(res, 'GROUPS_ALLOWED');
    } catch (error) {
        return internalErrorResponse(res);
    }
}

async function removeAllowedGroups(req, res) {
    const { appId, groupIdArr } = req.body;
    try {
        await Application.removeAllowedGroups(appId, groupIdArr);
        return successResponse(res, 'GROUPS_REMOVED');
    } catch (error) {
        return internalErrorResponse(res);
    }
}

async function getAllowedGroups(req, res) {
    const { appId } = req.params;
    try {
        const allowedGroups = await Application.getAllowedGroups(appId);
        return res.json({
            allowGroups: allowedGroups
        });
    } catch (error) {
        return internalErrorResponse(res);
    }
}

module.exports = {
    create,
    remove,
    getById,
    getAll,
    allowGroups,
    removeAllowedGroups,
    getAllowedGroups
};
