const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const studentCtrl = require('./student.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/students - Get list of students */
  .get(studentCtrl.list)

  /** POST /api/students - Create new student */
  .post(validate(paramValidation.createStudent), studentCtrl.create);

router.route('/:studentId')
  /** GET /api/students/:studentId - Get student */
  .get(studentCtrl.get)

  /** PUT /api/students/:studentId - Update student */
  .put(validate(paramValidation.updateStudent), studentCtrl.update)

  /** DELETE /api/students/:studentId - Delete student */
  .delete(studentCtrl.remove);

/** Load student when API with studentId route parameter is hit */
router.param('studentId', studentCtrl.load);

module.exports = router;
