const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    description:{
        type: String,
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true,
    },
    list:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'lists',
        require: true,
    },
    status: {
        type: String,
        default: "",
    },
    createadAt: {
        type: Date,
        default: Date.now,
    }

})

const task = mongoose.model('tasks', taskSchema)

module.exports = task