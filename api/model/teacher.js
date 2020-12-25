const mongoose = require('mongoose');
const { userSchema } = require('./user');

const teacherSchema = new mongoose.Schema({
    user: userSchema,
    bio: String,
    price: String,
    area: [String],
    day: [Date],
    subject: String
});

module.exports = { 
    teacherModel: mongoose.model('teacher', teacherSchema),
    teacherSchema
} ;