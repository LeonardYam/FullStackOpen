const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
    name: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        default: []
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)