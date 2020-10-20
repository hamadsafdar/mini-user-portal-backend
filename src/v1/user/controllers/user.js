const getADInstance = require('../../../../ad');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Application = require('../../models/Application');
const { token_secret } = require('../../config');

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
                'Mini-User Portal'
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
}

async function fetchUser(req, res) {
    let user;
    const activeDirectory = getADInstance();
    const { sAMAccountName } = req.decoded;
    try {
        const userEntry = await activeDirectory.findUser(
            sAMAccountName + '@hrt.demo.com'
        );
        user = new User(userEntry);
        return res.json({
            user
        });
    } catch (error) {
        console.log('USER CONTROLLER FETCH USER: ', error);
        return res.status(500).json({
            message: 'INTERNAL_ERROR'
        });
    }
}

async function fetchApplications(req, res) {
    // try {
    //     const applications = await Application.find();
    //     return res.json({
    //         applications: applications
    //     });
    // } catch (error) {
    //     return res.status(500).json({
    //         message: 'INTERNAL_ERROR'
    //     });
    // }
}

module.exports = {
    authenticate,
    fetchUser,
    fetchApplications
};
