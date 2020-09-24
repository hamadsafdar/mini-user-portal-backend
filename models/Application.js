const { Schema, model } = require('mongoose');

const applicationSchema = new Schema({
    appId: { type: String, default: `APP-${Date.now()}` },
    name: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String },
    group: [{ type: Schema.Types.ObjectId, ref: 'group' }]
});

const Application = model('application', applicationSchema);

module.exports = Application;
