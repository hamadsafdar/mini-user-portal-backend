const { Schema, model } = require('mongoose');
const activeDirectory = require('../ad')();

const applicationSchema = new Schema({
    appId: { type: String, default: `APP-${Date.now()}` },
    name: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String },
    groupsAllowed: [{ type: Schema.Types.ObjectId, ref: 'group' }]
});

applicationSchema.methods.isGrantedUser = function (user) {};

module.exports = model('application', applicationSchema);
