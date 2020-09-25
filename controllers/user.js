const getADInstance = require('../ad');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { token_secret } = require('../config');
const GROUP_NAME = 'Mini-User Portal';

async function authenticate(req, res) {
    const { username, password } = req.body;
    const activeDirectory = getADInstance();

    try {
        const user = await activeDirectory.findUser(username);
        if (!user) {
            return res.status(401).json({
                message: 'ACCOUNT_NOT_PROVISIONED'
            });
        } else {
            const isAuthenticated = await activeDirectory.authenticate(
                username,
                password
            );
            const isAuthorized = await activeDirectory.isUserMemberOf(
                username,
                GROUP_NAME
            );
            if (isAuthenticated && isAuthorized) {
                const { sAMAccountName } = user;
                const token = jwt.sign({ sAMAccountName }, token_secret, {
                    expiresIn: '1d'
                });
                return res.json({
                    token
                });
            } else {
                return res.status(401).json({
                    message: 'NOT_AUTHENTICATED_OR_AUTHORIZED'
                });
            }
        }
    } catch (error) {
        console.log('USER CONTROLLER AUTHENTICATE: ', error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }

    // try {
    //     const isAuthenticated = await activeDirectory.authenticate(
    //         username,
    //         password
    //     );
    //     const isAuthorized = await activeDirectory.isUserMemberOf(
    //         username,
    //         GROUP_NAME
    //     );

    //     if (isAuthenticated && isAuthorized) {
    //         const { userPrincipalName } = await activeDirectory.findUser(
    //             username
    //         );
    //         const token = jwt.sign(
    //             {
    //                 userPrincipalName: userPrincipalName
    //             },
    //             token_secret,
    //             {
    //                 expiresIn: '1h'
    //             }
    //         );
    //         return res.json({
    //             token: token
    //         });
    //     } else {
    //         return res.status(401).json({
    //             message: 'INVALID_CREDS/NOT_PRIVILAGISED',
    //             isAuthenticated: false
    //         });
    //     }
    // } catch (error) {
    //     // console.log(error);
    //     return res.status(500).json({
    //         message: 'INTERNAL_ERROR'
    //     });
    // }
}

async function fetchUser(req, res) {
    let user;
    const activeDirectory = getADInstance();
    const { userPrincipalName } = req.decoded;
    try {
        const userEntry = await activeDirectory.findUser(userPrincipalName);
        user = new User(userEntry);
        user.initUserGroups();
    } catch (error) {}
}

module.exports = {
    authenticate,
    fetchUser
};
