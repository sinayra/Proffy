const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    bio: String,
    price: String,
    area: [String],
    schedule_ids: [String],
    subject: String
});

module.exports = mongoose.model('teachers', teacherSchema);