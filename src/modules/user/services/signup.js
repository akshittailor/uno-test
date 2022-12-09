const { logger } = require("../../../logger");
const { generateResponseJson } = require("../../../utils/response");
const User = require('../../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;

const signupUserServiceV1 = async (reqBody) => {
  try {
    const {name,email,password,contactNo} = reqBody;
    if(!(name && email && password && contactNo)){
      return generateResponseJson({}, 400, 'Fields are compulsory');
    }
    const existUser = await User.findOne({ $or:[{ email },{ contactNo }] });
    if(existUser) {
      return generateResponseJson({}, 401, 'User already exists');
    }
    const encryptedPassword = await bcrypt.hash(password,10)
    const usrInstance = await User.create({
      name,
      email,
      contactNo,
      password: encryptedPassword
    })
    const token = jwt.sign({id:usrInstance._id,email},jwtSecret,{expiresIn:"2h"})
    usrInstance.token = token;
    usrInstance.password = undefined
    return generateResponseJson({}, 200, 'User created successfully!');
  } catch (error) {
    logger.error('Error from signupUserServiceV1', error);
    throw error;
  }
}

module.exports = signupUserServiceV1