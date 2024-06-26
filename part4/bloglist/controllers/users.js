const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;
    if (username.length >= 3 && password.length >= 3) {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({ username, name, passwordHash });

        const savedUser = await user.save();

        res.status(201).json(savedUser);
    }
    else {
        res.status(400).json({ error: "username and password must be at least 3 characters." });
    }
});

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 });
    res.json(users);
});



module.exports = userRouter;