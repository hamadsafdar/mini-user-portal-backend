const Group = require('../../models/Group');
const {
    successResponse,
    internalErrorResponse
} = require('../../util').responseGenerator;

async function create(req, res) {
    const { name, description } = req.body;
    const group = new Group({ GROUP_NAME: name, DESCRIPTION: description });
    try {
        await group.save();
        return successResponse(res, 'GROUP_CREATED');
    } catch (error) {
        return internalErrorResponse(res);
    }
}

async function remove(req, res) {
    const { groupId } = req.params;
    try {
        await Group.removeById(groupId);
        return successResponse(res, 'GROUP_DELETED');
    } catch (error) {
        return internalErrorResponse(res);
    }
}

async function get(req, res) {
    const { groupId } = req.params;
    try {
        const group = await Group.findById(groupId);
        return res.json({
            group
        });
    } catch (error) {
        return internalErrorResponse(res);
    }
}

async function getMembers(req, res) {
    const { groupId } = req.params;
    try {
        const members = await Group.getMembers(groupId);
        const total = members.length;
        return res.json({
            members,
            total
        });
    } catch (error) {
        return internalErrorResponse(res);
    }
}

async function getAll(req, res) {
    const { iteration } = req.query;
    const LIMIT = 20;
    const offset = LIMIT * (parseInt(iteration) - 1);
    try {
        const groups = await Group.find(LIMIT, offset);
        return res.json({
            groups
        });
    } catch (error) {
        console.log(error);
        return internalErrorResponse(res);
    }
}

module.exports = { create, remove, get, getMembers, getAll };
