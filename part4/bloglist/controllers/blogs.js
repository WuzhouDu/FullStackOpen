const Blog = require('../models/blog');
const User = require('../models/user');
const blogsRouter = require('express').Router();
const logger = require('../utils/logger');

blogsRouter.get('/', async (req, res) => {
    const users = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
    res.json(users);
});

blogsRouter.post('/', async (req, res) => {
    const body = req.body;
    const anyUser = await User.findOne();;
    body.user = anyUser._id;
    const blog = new Blog(body);

    const savedBlog = await blog.save();
    anyUser.blogs = anyUser.blogs.concat(savedBlog._id);
    await anyUser.save();

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