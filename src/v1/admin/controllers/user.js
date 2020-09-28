const User = require('../../models/User');

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

async function modify(req, res) {
    const {} = req.body;
}

async function addUserToGroup(req, res) {
    const { sAMAccountName } = req.decoded;
    const { groups } = req.body;
    try {
        const user = await User.find({ sAMAccountName });
        await user.addToGroup(groups);
        return res.json({
            message: 'USER_ADDED_TO_GROUP(S)'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
}

module.exports = {
    create,
    modify,
    addUserToGroup
};
