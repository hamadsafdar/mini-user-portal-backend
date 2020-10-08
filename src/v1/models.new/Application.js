function Application({ name, description, url, allowedGroups = [] }) {
    this.name = name;
    this.description = description;
    this.url = url;
    this.allowedGroups = allowedGroups;
}

Application.prototype.save = async function () {};

Application.prototype.delete = async function () {};

Application.prototype.update = async function (newOptions) {};

module.exports = Application;
