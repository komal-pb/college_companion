const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getStudents , getTeacher} = require('../controller/authController');

// Fetch a single teacher
router.get('/teacher/:id', getTeacher);

router.get('/students', getStudents);

// @route POST /api/register
router.post('/register', registerUser);

// @route POST /api/login
router.post('/login', loginUser);

module.exports = router;
