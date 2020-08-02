const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    password:{
        type: String,
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const user = mongoose.model('users', userSchema)

module.exports = user