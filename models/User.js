const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


userSchema.methods.generateToken = function() {

    return jwt.sign({userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });
    
}


module.exports = mongoose.model('User', userSchema);