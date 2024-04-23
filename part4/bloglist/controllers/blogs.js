const Blog = require('../models/blog');
const blogsRouter = require('express').Router();
const logger = require('../utils/logger');

blogsRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        });
});

blogsRouter.post('/', (req, res) => {
    const blog = new Blog(req.body)

    blog
        .save()
        .then(result => {
            res.status(201).json(result)
        });
});

blogsRouter.delete('/:id', async (req, res) => {
    const deletedId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(deletedId);
    if (deletedBlog) {
        return res.status(200).send();
    }
    else {
        res.status(400).send({error: "deleted content does not exist"});
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

    const updatedOne = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true});
    res.json(updatedOne);
})


module.exports = blogsRouter;