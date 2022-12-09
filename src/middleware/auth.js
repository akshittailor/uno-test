const jwt = require('jsonwebtoken');
const { logger } = require('../logger');
const User = require('../models/user.model');
const { generateResponseJson } = require('../utils/response');
const jwtSecret = process.env.JWT_SECRET;

const authentication = async (req,res,next) => {
  try {
    const { token } = req.cookies
    if (!token) {
      throw new Error('Please login!');
    }
    const decode = jwt.verify(token,jwtSecret);
    if(decode && decode.id){
      const user = await User.findOne({_id:decode.id});
      if (!user) {
        throw new Error('User does not exists!');
      }
      req.user = {
        id: user._id
      }
    }
    return next();
  } catch (error) {
    logger.error('Error while authentication for user: ', error);
    res.status(401);
    if(error && error.message === 'Session Expired'){
      res.send(generateResponseJson({},401,'You are not well authenticated,token expired'))
    } else if(error && error.message === 'User does not exists'){
      res.send(generateResponseJson({},401,'User does not exists'))
    } else{
      res.send(generateResponseJson({},401,'You are not well authenticated'))
    }
  }
}

module.exports = authentication;
