const mongoose = require('mongoose');
const { userSchema } = require('./user');
const { teacherSchema } = require('./teacher');

const studentSchema = new mongoose.Schema({
    user: userSchema,
    favorite: [teacherSchema],
    connected: [teacherSchema]
});

module.exports = mongoose.model('student', studentSchema);