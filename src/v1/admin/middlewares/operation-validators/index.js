const Application = require('../../../models.new/Application');
const Group = require('../../../models.new/Group');
const User = require('../../../models.new/User');
const { customFailResponse } = require('../../../util').responseGenerator;

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

module.exports = { ifExists };
