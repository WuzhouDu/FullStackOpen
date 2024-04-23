const logger = require('../utils/logger');

const errorhandler = (error, req, res, next) => {
    if (error) {
        if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
            return res.status(400).json({error: 'expected `username` to be unique'});
        }
    }
}

module.exports = errorhandler;