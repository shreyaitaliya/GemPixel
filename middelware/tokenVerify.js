const jwt = require('jsonwebtoken');

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({
            success: false,
            message: 'Token is missing'
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'Token is missing'
        });
    }

    jwt.verify(token, 'GemPixel', (error, decoded) => {
        if (error) {
            return res.status(403).send({
                success: false,
                message: 'Token is not valid',
            });
        }
        req.user = decoded.User;

        next();
    });
};

module.exports = authenticateToken;