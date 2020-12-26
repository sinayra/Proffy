const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    favorite_teacher_ids: [String],
    connected_teacher_ids: [String]
});

module.exports = mongoose.model('student', studentSchema);