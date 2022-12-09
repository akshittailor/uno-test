const { logger } = require("../../../logger");
const User = require("../../../models/user.model");
const { generateResponseJson } = require("../../../utils/response");

const getLoggedInUserService = async (reqUser) =>{
  try {
    const { id } = reqUser;
    const userInstance = await User.findOne({_id:id})
    if(!userInstance) {
      return generateResponseJson({},400,'User not found!');
    }
    userInstance.password = undefined
    return userInstance;
  } catch (error) {
    logger.error('Error from getLoggedInUserService', error);
    throw error;
  }
}

module.exports = getLoggedInUserService