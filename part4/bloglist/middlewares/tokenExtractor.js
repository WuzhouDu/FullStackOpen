const User = require('../models/user');
const jwt = require('jsonwebtoken');

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '');
    }
    next();
}

const userExtractor = async (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        const decodedObject = jwt.verify(authorization.replace('Bearer ', ''), process.env.SECRET);
        if (!decodedObject.id) {
            return res.status(401).json({ error: 'token invalid' });
        }
        const user = await User.findById(decodedObject.id);
        if (!user) {
            return res.status(401).json({ error: 'token invalid' });
        }
        req.user = user;
    }
    next();
}

module.exports = userExtractor;