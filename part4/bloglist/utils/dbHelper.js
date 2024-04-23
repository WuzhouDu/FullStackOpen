const mongoose = require('mongoose');
const User = require('../models/user');
const Blog = require('../models/blog');
MONGODB_URI = 'mongodb+srv://dwz:Wz139119@fullstackopen.1osvxcf.mongodb.net/bloglistApp?retryWrites=true&w=majority&appName=fullStackOpen';

mongoose.connect(MONGODB_URI).then(_ => {
    console.log('connection ok');
});

const deleteAllUser = () => {
    return User.deleteMany({});
};

const deleteAllBlog = () => {
    return Blog.deleteMany({});
};

Promise.all([deleteAllBlog(), deleteAllUser()]).then(() => {
    console.log('delete all');
    process.exit(0);
});