const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
    }
});

module.exports = mongoose.model('user', userSchema);