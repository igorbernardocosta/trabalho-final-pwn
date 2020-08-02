const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true,
    },
    createadAt: {
        type: Date,
        default: Date.now,
    }
})

const list = mongoose.model('lists', listSchema)

module.exports = list