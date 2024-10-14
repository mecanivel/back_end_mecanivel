const jwt = require('jsonwebtoken');
const Messages = require('../errormessages/messages');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Access Denied: No Token Provided');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({ messages: Messages.INVALID_TOKEN });
        
        req.user = user;
        next(); 
    });
}

module.exports = authenticateToken;
