const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
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
    },
    emp_id: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    base: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    adminLevel: {
        type: Number,
        required: true
    },
    lineManager: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)



