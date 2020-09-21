const ActiveDirectory = require("activedirectory2");
const { ad: adConfig } = require("./config");

module.exports = () => {
  let instance;
  getInstance: () => {
    if (!instance) {
      instance = new ActiveDirectory({
        url: adConfig.url,
        baseDN: adConfig.baseDn,
        username: adConfig.username,
        password: adConfig.password,
      });
      return instance;
    } else return instance;
  };
};
