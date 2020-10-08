function User({
    name,
    sAMAccountName,
    email,
    principalName,
    groups = [],
    status = false
}) {
    this.name = name;
    this.email = email;
    this.sAMAccountName = sAMAccountName;
    this.principalName = principalName;
    this.isEnabled = status;
    this.groups = groups;
}

User.prototype.save = async function () {};

User.prototype.delete = async function () {};

User.prototype.update = async function (newOptions) {};

module.exports = User;
