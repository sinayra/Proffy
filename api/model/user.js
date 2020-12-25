const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    hash: String,
    whatsapp: String,
    avatar: String,
    role: String
});

module.exports = { 
    userModel: mongoose.model('user', userSchema), 
    userSchema
}