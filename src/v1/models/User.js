const { Schema, model } = require('mongoose');

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
    //TODO: Add user ids to groups
    this.groupMembership = [...this.groupMembership, ...groupIds];
    try {
        return await this.save();
    } catch (error) {
        return new Error(`Unable to update the document. \nError: ${error}`);
    }
};

userSchema.methods.setStatus = async function (status) {
    this.isEnable = status;
    try {
        await this.save();
    } catch (error) {
        return new Error(`Unable to update the document. \nError: ${error}`);
    }
};

module.exports = model('user', userSchema);
{
    // const Application = require('./Application');
    // const getAdInstance = require('../ad');
    // function User({ sAMAccountName, cn, mail, userPrincipalName }) {
    //     this.id = sAMAccountName;
    //     this.name = cn;
    //     this.email = mail;
    //     this.principalName = userPrincipalName;
    //     this.groups = [];
    //     this.applications = [];
    // }
    // User.prototype.getGrantedApplications = function (applications) {
    //     const userApplications = applications.filter((application) => {
    //         return this.groups.includes(application.group);
    //     });
    // };
    // User.prototype.initUserGroups = async function () {
    //     const activeDirectory = getAdInstance();
    //     try {
    //         const uGroups = await activeDirectory.getGroupMembershipForUser(
    //             this.principalName
    //         );
    //         if (!uGroups) return new Error('USER_NOT_FOUND');
    //         else this.groups = uGroups;
    //     } catch (error) {
    //         return error;
    //     }
    // };
}
