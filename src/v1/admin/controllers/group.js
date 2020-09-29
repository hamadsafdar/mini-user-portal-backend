const Group = require('../../models/Group');

async function create(req, res) {
    const { name, description } = req.body;

    const group = new Group({
        name: name,
        description: description
    });
    try {
        await group.save();
        return res.status(201).json({
            message: 'GROUP_CREATED'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
}

async function remove(req, res) {
    const groupId = req.params.groupId;
    try {
        await Group.findByIdAndDelete(groupId);
        return res.json({
            message: 'GROUP_REMOVED'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
}

async function getAll(req, res) {
    try {
        const groups = await Group.find();
        return res.json({
            groups: groups
        });
    } catch (error) {}
}

async function get(req, res) {
    const { groupId } = req.params;
    try {
        const group = await Group.findById(groupId);
        return res.json({
            group
        });
    } catch (error) {
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
}

async function edit(req, res) {}

module.exports = {
    create,
    remove,
    getAll,
    edit,
    get
};
