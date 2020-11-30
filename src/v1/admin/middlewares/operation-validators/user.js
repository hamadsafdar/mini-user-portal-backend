const User = require('../../../models/User');

const getNotIncludedProperties = (user = {}) => {
    const requiredProperties = [
        'name',
        'sAMAccountName',
        'email',
        'phoneNumber'
    ];
    const includedProperties = Object.keys(user);
    const propertiesNotIncluded = requiredProperties.filter(
        (prop) => !includedProperties.includes(prop)
    );
    return propertiesNotIncluded;
};

const checkUniqueness = async (user) => {
    
};

module.exports = { getNotIncludedProperties };
