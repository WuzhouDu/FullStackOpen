const express = require('express');
const config = require('./utils/config');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./utils/logger');
require('express-async-errors');
const blogsRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const errorhandler = require('./middlewares/errorhandler');

mongoose.set('strictQuery', false);

logger.info('connecting to MongoDB...');

mongoose.connect(config.MONGODB_URI).then(ok => {
    logger.info("connected to MongoDB");
}).catch(err => { logger.error(`error connecting to MongoDB`, err.message) });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);



app.use(errorhandler);
module.exports = app;