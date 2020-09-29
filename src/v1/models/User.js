const { Schema, model } = require('mongoose');
const Group = req;

const userSchema = new Schema(
    {
        sAMAccountName: { type: String, unique: true, required: true },
        name: { type: String, required: true },
        email: { type: String },
        principalName: { type: String, required: true },
        groupMembership: [{ type: Schema.Types.ObjectId, ref: 'group' }],
        isEnable: { type: Boolean, default: false }
    },
    { timestamps: true }
);

userSchema.methods.addToGroup = async function (groupIds) {
    this.groupMembership = [...this.groupMembership, ...groupIds];
    try {
        return await this.save();
    } catch (error) {
        return new Error(
            `Unable to update the user settings. \nError: ${error}`
        );
    }
};

userSchema.methods.removeFromGroup = async function (groupIds) {
    this.groupMembership.splice(this.groupMembership.indexOf(groupId), 1);
    try {
        return await this.save();
    } catch (error) {
        return new Error(
            `Unable to update the user settings. \nError: ${error}`
        );
    }
};

module.exports = model('user', userSchema);
