const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    bio: String,
    price: String,
    area: [String],
    day: [String],
    subject: String
});

module.exports = mongoose.model('teacher', teacherSchema);