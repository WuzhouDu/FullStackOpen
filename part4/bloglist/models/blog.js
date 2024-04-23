const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

blogSchema.set('toJSON', {
    transform: (doc, returned) => {
        returned.id = returned._id.toString();
        delete returned.__v;
        delete returned._id;
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;