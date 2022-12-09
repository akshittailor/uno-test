const { logger } = require("../../../logger");
const { generateResponseJson } = require("../../../utils/response");
const User = require('../../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;

const loginUserServiceV1 = async (reqBody) => {
  try {
    const {email,password} = reqBody;
    if(!(email && password)){
      return generateResponseJson({}, 400, 'Fields are compulsory');
    }
    const userInstance = await User.findOne({ email });
    if(!userInstance) {
      return generateResponseJson({}, 400, 'User not found!');
    }
    const isPasswordMatch = await bcrypt.compare(password,userInstance.password);

    if(!isPasswordMatch) {
      return generateResponseJson({}, 401, 'Password not match!');
    }
    if(userInstance && isPasswordMatch){
      const token = jwt.sign({id: userInstance._id},jwtSecret,{expiresIn:"2h"})
      userInstance.token = token;
      userInstance.save();
      const response = {
        token,
        id: userInstance._id
      }
      return response
    }
  } catch (error) {
    logger.error('Error from loginUserServiceV1', error);
    throw error;
  }
}

module.exports = loginUserServiceV1