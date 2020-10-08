const jwt = require('jsonwebtoken');
const { token_secret } = require('../../config');

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

module.exports = { authenticateToken };
