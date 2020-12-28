const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        minLength: 1,
        maxLength: 255
    },
    hash: {
        type: String,
        required: true
    },
    whatsapp: String,
    avatar: String,
    role: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value === 'STUDENT' || value === 'ADMIN' || value === 'TEACHER';
            },
            message: props => `${props.value} is not an acceptable account role`
        }
    },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('user', userSchema);