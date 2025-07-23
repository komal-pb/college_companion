// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const {
  saveAttendance,
  getStudentAttendance,
} = require('../controller/attendanceController');

// @route POST /api/attendance
router.post('/attendance', saveAttendance);

// @route GET /api/attendance/:studentName
router.get('/attendance/:studentName', getStudentAttendance);

module.exports = router;
