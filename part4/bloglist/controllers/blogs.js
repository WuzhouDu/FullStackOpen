const Blog = require('../models/blog');
const User = require('../models/user');
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const extractTokenFrom = (request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return null;
}

blogsRouter.get('/', async (req, res) => {
    const users = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    res.json(users);
});

blogsRouter.post('/', async (req, res) => {
    const body = req.body;

    // this line can possibly incur error. handled by error handler error.name = 'JsonWebTokenError'
    const decodedObject = jwt.verify(extractTokenFrom(req), process.env.SECRET);
    if (!decodedObject.id) {
        return res.status(401).json({ error: 'token invalid' });
    }
    const user = await User.findById(decodedObject.id);
    const blog = new Blog({
        url: body.url,
        title: body.title,
        author: body.author,
        likes: body.likes,
        user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
    const deletedId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(deletedId);
    if (deletedBlog) {
        return res.status(200).send();
    }
    else {
        res.status(400).send({ error: "deleted content does not exist" });
    }
});

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    };

    const updatedOne = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
    res.json(updatedOne);
})


module.exports = blogsRouter;