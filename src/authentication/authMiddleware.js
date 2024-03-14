const jwt = require('jsonwebtoken');
const config = require('../../config');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorisation'];

    if (!token) {
        return res.status(401).send('Token required');
    }

    try {
        const decoded = jwt.verify(token, config.AUTH_SECRET);
        req.claims = decoded;
    } catch (error) {  
        return res.status(400).send('Invalid token');
    }
    return next();
};

module.exports = verifyToken;