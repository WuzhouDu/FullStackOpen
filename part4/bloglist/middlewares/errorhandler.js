const logger = require('../utils/logger');

const errorhandler = (error, req, res, next) => {
    if (error) {
        if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
            return res.status(400).json({error: 'expected `username` to be unique'});
        }
        else if (error.name === 'JsonWebTokenError') {
            logger.error('error handler: jwt token invalid');
            return res.status(401).json({error: 'token invalid'});
        }
    }
    next(error);
}

module.exports = errorhandler;