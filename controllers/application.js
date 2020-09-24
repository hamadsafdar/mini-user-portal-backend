const Application = require('../models/Application');

async function create(req, res) {
    const { name, link, description, group } = req.body;

    const appplication = new Application({
        name,
        link,
        description,
        group
    });
    try {
        await appplication.save();
        return res.status(201).json({
            message: 'APPLICATION_CREATED'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
}

async function remove(req, res) {
    const id = req.params.appId;
    try {
        await Application.findByIdAndDelete(id);
        return res.json({
            message: 'APPLICATION_DELETED'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
}

async function getAll(req, res) {
    try {
        const applications = await Application.find();
        return res.json({
            applications
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
}

module.exports = {
    create,
    remove,
    getAll
};
