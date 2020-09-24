const getADInstance = require('../ad');
const User = require('../models/User');
const GROUP_NAME = 'Mini-User Portal';

let user;

async function authenticate(req, res) {
    const { username, password } = req.body;
    const ad = getADInstance();

    try {
        const isAuthenticated = await ad.authenticate(username, password);
        const isAuthorized = await ad.isUserMemberOf(username, GROUP_NAME);

        if (isAuthenticated && isAuthorized) {
            const userEntry = await ad.findUser(username);
            user = new User(userEntry);
            await user.initUserGroups();
            return res.json({
                isAuthenticated: true,
                user: user
            });
        } else {
            return res.status(401).json({
                message: 'INVALID_CREDS/NOT_PRIVILAGISED',
                isAuthenticated: false
            });
        }
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
}

module.exports = {
    authenticate
};
