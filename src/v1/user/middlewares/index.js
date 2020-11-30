const jwt = require('jsonwebtoken');
const getADInstance = require('../../../../ad');
const { token_secret } = require('../../config');
const User = require('../../models/User');
const {
    customFailResponse,
    internalErrorResponse
} = require('../../util').responseGenerator;

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.status(401).json({
            message: 'TOKEN_NOT_PROVIDED'
        }); // if there isn't any token

    jwt.verify(token, token_secret, (err, decoded) => {
        if (err)
            return res.status(403).json({
                message: 'INVALID_TOKEN'
            });
        req.decoded = decoded;
        next(); // pass the execution off to whatever request the client intended
    });
}

async function checkUserSynced(req, res, next) {
    const { principalName } = req.body;
    // const domain = '@hrt.demo.com';
    // const principalName = username + domain;
    const ad = getADInstance();
    try {
        const existsInAD = Boolean(await ad.userExists(principalName));
        const existsInDB = Boolean(
            await User.findBySAM(principalName.split('@')[0]) //splitting SAM Account Name and domain
        );
        if (existsInAD && existsInDB) next();
        if (!existsInAD)
            return customFailResponse(res, 'USER_NOT_EXISTS_IN_AD', 400);
        else if (!existsInDB)
            return customFailResponse(res, 'USER_NOT_EXISTS_IN_APP', 400);
    } catch (error) {
        return internalErrorResponse(res);
    }
}

module.exports = { authenticateToken, checkUserSynced };
