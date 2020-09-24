const Application = require('./Application');
const getAdInstance = require('../ad');

function User({ sAMAccountName, cn, mail, userPrincipalName }) {
    this.id = sAMAccountName;
    this.name = cn;
    this.email = mail;
    this.principalName = userPrincipalName;
    this.groups = [];
    this.applications = [];
}

User.prototype.getGrantedApplications = (applications) => {};

User.prototype.initUserGroups = async function () {
    const activeDirectory = getAdInstance();
    try {
        const uGroups = await activeDirectory.getGroupMembershipForUser(
            this.principalName
        );
        if (!uGroups) return new Error('USER_NOT_FOUND');
        else this.groups = uGroups;
    } catch (error) {
        return error;
    }
};

module.exports = User;
