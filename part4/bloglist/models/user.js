const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    passwordHash: String,
});

userSchema.set('toJSON', {
    transform: (doc, returned) => {
        returned.id = returned._id.toString();
        delete returned.__v;
        delete returned._id;
        delete returned.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;