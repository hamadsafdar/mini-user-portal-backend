const Application = require('../../models.new/Application');

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
        return successResponse(res, 'APPLICATION_CREATED');
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
        return res.json({
            application
        });
    } catch (error) {
        console.log('Controller');
        return internalErrorResponse(res);
    }
}

async function allowGroups(req, res) {}

async function removeAloowedGroups(req, res) {}

async function getAllowedGroups(req, res) {}

module.exports = { create, remove, getById };
