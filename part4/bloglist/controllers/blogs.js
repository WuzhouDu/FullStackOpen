const Blog = require('../models/blog');
const User = require('../models/user');
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const userExtractor = require('../middlewares/tokenExtractor');


blogsRouter.get('/', async (req, res) => {
    const users = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    res.json(users);
});

blogsRouter.post('/', userExtractor, async (req, res) => {
    const body = req.body;

    // this line can possibly incur error. handled by error handler error.name = 'JsonWebTokenError'
    const user = req.user;
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

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
    const user = req.user;
    const deletedId = req.params.id;
    const deletedBlog = await Blog.findById(deletedId);
    if (deletedBlog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(deletedId);
        return res.status(200).send();
    }
    else {
        res.status(401).send({ error: "wrong authentication, not allowed to delete" });
    }
});

blogsRouter.put('/:id', userExtractor, async (req, res) => {
    const user = req.user;
    const body = req.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    };

    const updatedOne = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
    user.blogs = user.blogs.concat(updatedOne._id);
    await user.save();
    res.json(updatedOne);
})


module.exports = blogsRouter;