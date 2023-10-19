const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        requird: true
    },
    isTaskCompleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Task', taskSchema);