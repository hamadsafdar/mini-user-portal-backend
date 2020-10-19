const { Schema, model } = require('mongoose');

const groupSchema = new Schema(
    {
        name: { type: String, required: true },
        description: {
            type: String,
            default: 'This is the description of the group.'
        },
        type: { type: String },
        members: [{ type: Schema.Types.ObjectId, ref: 'user' }]
    },
    { timestamps: true }
);

groupSchema.methods.addMember = async function (id) {
    try {
        this.members.push(id);
        return await this.save();
    } catch (error) {
        return new Error('Failed to update group setting!.\nERROR: ', error);
    }
};

groupSchema.methods.removeMember = async function (id) {
    this.members.splice(this.members.splice(id), 1);
    try {
        return await this.save();
    } catch (error) {
        return new Error('Failed to update group setting!.\nERROR: ', error);
    }
};

module.exports = model('group', groupSchema);
