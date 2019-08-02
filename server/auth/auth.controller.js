const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User=require('../user/user.model');


/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity

    User.findOne({username:req.body.username}).then(result=>{
      const token = jwt.sign({
        username: result.username
      }, config.jwtSecret,{ expiresIn: '24h'}
      );
      res.send(token);
    }).catch(error=>{
      const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
      return next(err);
    })

}

module.exports = { login };
