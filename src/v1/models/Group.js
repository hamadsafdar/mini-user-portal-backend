const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
    name: { type: String, required: true },
    description: {
        type: String,
        default: 'This is the description of the group.'
    }
});

module.exports = model('group', groupSchema);
