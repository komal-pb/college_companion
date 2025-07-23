// controllers/attendanceController.js
const Attendance = require('../models/Attendance');

// Save attendance
exports.saveAttendance = async (req, res) => {
  const { subject, teacherId, records } = req.body;

  try {
    const attendance = new Attendance({
      subject,
      teacher: teacherId,
      records,
    });

    await attendance.save();
    res.status(201).json({ msg: 'Attendance saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get attendance by student name

// controllers/attendanceController.js
exports.getStudentAttendance = async (req, res) => {
  const studentName = req.params.studentName;

  try {
    const records = await Attendance.find({
      "records.studentName": studentName,
    });

    const attendanceBySubject = {};

    records.forEach((record) => {
      const studentEntry = record.records.find(
        (s) => s.studentName === studentName
      );
      if (studentEntry) {
        if (!attendanceBySubject[record.subject]) {
          attendanceBySubject[record.subject] = { total: 0, present: 0 };
        }
        attendanceBySubject[record.subject].total += 1;
        if (studentEntry.present) {
          attendanceBySubject[record.subject].present += 1;
        }
      }
    });

    res.json(attendanceBySubject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching attendance" });
  }
};



