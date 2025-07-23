// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  subject: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  records: [
    {
      studentName: String,
      present: Boolean,
    },
  ],
});

module.exports = mongoose.model('Attendance', attendanceSchema);
