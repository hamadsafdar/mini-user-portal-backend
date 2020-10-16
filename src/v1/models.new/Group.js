function Group({ GROUP_ID: id, GROUP_NAME: name, DESCRIPTION: description }) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.members = members;
}

Group.prototype.save = async function () {};

Group.prototype.delete = async function () {};

Group.prototype.update = async function (newOptions) {};

Group.prototype.getUsers = async function () {};

module.exports = Group;
