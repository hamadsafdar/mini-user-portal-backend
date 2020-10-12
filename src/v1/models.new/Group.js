function Group({ name, type, description, members = [] }) {
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
