const mongoose = require('mongoose');

//Schema
const UserSchema = new mongoose.Schema({
  fname: {
        type: String,
        required: true,
        minlength: 4
    },
    lname: {
        type: String,
        required: true,
        minlength: 4
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already exists"],
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    messages: [
        {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            subject: {
                type: String,
                required: true,
            },
            message: {
                type: String,
                required: true,
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

//Collection create
const User_model = new mongoose.model('Users', UserSchema);
module.exports = User_model;
