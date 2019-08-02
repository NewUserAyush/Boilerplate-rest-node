const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Student Schema
 */
const StudentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */



/**
 * Statics
 */
StudentSchema.statics = {
  /**
   * Get student
   * @param {ObjectId} id - The objectId of student.
   * @returns {Promise<Student, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((student) => {
        if (student) {
          return student;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List students in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of students to be skipped.
   * @param {number} limit - Limit number of students to be returned.
   * @returns {Promise<Student[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Student
 */
module.exports = mongoose.model('Student', StudentSchema);
