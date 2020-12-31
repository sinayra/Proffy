const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    teacher_id: {
        type: String,
        required: true
    },
    weekday: { 
        type: Number, 
        default: 0, 
        min: 0, 
        max: 6
    },
    from: { 
        type: Number, 
        default: 0, 
        min: 0, 
        max: 1439
    },
    to: { 
        type: Number, 
        default: 0, 
        min: 0, 
        max: 1439
    }
});

module.exports = mongoose.model('schedules', scheduleSchema);