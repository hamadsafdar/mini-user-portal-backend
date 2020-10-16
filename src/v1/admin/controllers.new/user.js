const User = require('../../models.new/User');

const create = async (req, res) => {
    const { sAMAccountName, name, email, phoneNumber } = req.body;

    const user = new User({
        USER_ID: null,
        SAM_ACCOUNT_NAME: sAMAccountName,
        FULL_NAME: name,
        EMAIL: email,
        PHONE_NUMBER: phoneNumber
    });

    try {
        //TODO: User doesn't exists validation
        await user.save();
        return res.status(201).json({
            message: 'USER_CREATED'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
};

const removeById = async (req, res) => {
    const { userId } = req.params;
    try {
        if (await User.ifExists(userId)) {
            await User.delete(userId);
            return res.json({
                message: 'USER_DELETED'
            });
        } else {
            return res.status(400).json({
                message: 'INVALID_USER_ID'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
};

const get = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user.length > 0)
            return res.json({
                user: user[0]
            });
        else
            return res.status(200).json({
                message: 'NO_USER_FOUND'
            });
    } catch (error) {
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
};

const getAll = async (req, res) => {
    const limit = req.body?.limit;
    const offset = req.body?.offset;
};

const changeStatus = async (req, res) => {
    const { userId } = req.params;
    try {
        let user = await User.findById(userId);
        await user.changeStatus();
        return res.json({
            message: 'STATUS_CHANGED'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
};

const addToGroup = async (req, res) => {
    const { userId, groupId } = req.body;
    try {
        if (await validateMembershipAdd(userId, groupId)) {
            await User.addToGroup(userId, groupId);
            return res.json({
                message: 'USER_ADDED_TO_GROUP'
            });
        } else {
            return res.status(400).json({
                message: 'INVALID_REQUEST'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
};

const removeFromGroup = async (req, res) => {
    const { userId, groupId } = req.body;
    try {
        if (await validateMembershipDelete(userId, groupId)) {
            await User.removeFromGroup(userId, groupId);
            return res.json({
                message: 'MEMBERSHIP_REMOVED'
            });
        } else {
            return res.status(400).json({
                message: 'INVALID_REQUEST'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
};

const getGroups = async (req, res) => {
    const { userId } = req.params;
    try {
        if (await User.ifExists(userId)) {
            const groups = await User.getGroups(userId);
            if (groups.length === 0) {
                return res.json({ message: 'NO_MEMBERSHIP_FOUND' });
            } else {
                return res.json({
                    groups
                });
            }
        } else {
            return res.status(400).json({
                message: 'INVALID_REQUEST'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
};

module.exports = {
    create,
    removeById,
    get,
    changeStatus,
    addToGroup,
    removeFromGroup,
    getGroups
};

//Local methods

const validateMembershipDelete = async (userId, groupId) => {
    //TODO: remove groups from new request of which user is already member of
    try {
        return (
            (await User.ifExists(userId)) &&
            true /*If group exists */ &&
            (await User.isMemberOf(userId, groupId))
        );
    } catch (error) {
        Promise.reject(error);
    }
};

const validateMembershipAdd = async (userId, groupId) => {
    try {
        return (
            (await User.ifExists(userId)) &&
            true /* if group exists*/ &&
            !(await User.isMemberOf(userId, groupId))
        );
    } catch (error) {
        Promise.reject(error);
    }
};
