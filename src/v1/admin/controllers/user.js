const User = require('../../models/User');
const Group = require('../../models/Group');

async function create(req, res) {
    const defaultGroup = '';
    const { sAMAccountName, name, email, principalName } = req.body.user;
    const user = new User({
        sAMAccountName,
        name,
        email,
        principalName
    });
    try {
        await user.save();
        return res.status(201).json({
            message: 'USER_CREATED'
        });
    } catch (error) {
        console.log('USER CONTROLLER CREATE ERROR: ', error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
}

async function edit(req, res) {
    const {} = req.body;
}

async function addUserToGroup(req, res) {
    const { sAMAccountName } = req.decoded;
    const { groups: groupIds } = req.body;
    try {
        const user = await User.find({ sAMAccountName });
        await user.addToGroup(groupIds);
        groupIds.map(async (id) => {
            const group = await Group.findById(id);
            try {
                await group.addMember(user._id);
                return;
            } catch (error) {
                return console.log(error);
            }
        });
        return res.json({
            message: 'USER_ADDED_TO_GROUP(S)'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
}

async function removeUserFromGroup(req, res) {}

async function get(req, res) {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        return res.json({
            user
        });
    } catch (error) {
        console.log('USER CONTROLLER GET: ', error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
}

async function getAll(req, res) {
    try {
        const users = await User.find();
        return res.json({
            users
        });
    } catch (error) {
        console.log('USER CONTROLLER GET ALL ERROR: ', error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
}

async function remove(req, res) {}

module.exports = {
    create,
    edit,
    addUserToGroup,
    removeUserFromGroup,
    get,
    getAll,
    remove
};
