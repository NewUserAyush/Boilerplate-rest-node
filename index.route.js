const express = require('express');
const userRoutes = require('./server/user/user.route');
const authRoutes = require('./server/auth/auth.route');
const studentRoutes=require('./server/students/student.route');

const router = express.Router(); // eslint-disable-line new-cap

//mount student route at /student
router.use('/students',studentRoutes);

// mount auth routes at /auth
 router.use('/auth', authRoutes);

module.exports = router;
