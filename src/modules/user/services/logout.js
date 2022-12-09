const { logger } = require("../../../logger");
const User = require("../../../models/user.model");
const { generateResponseJson } = require("../../../utils/response");

const logoutUserService = async (req,res) =>{
  try {
   res.clearCookie('token',{path:"/"});
   req.user = undefined;
  return generateResponseJson({},200,'Logout successfully!')
  } catch (error) {
    logger.error('Error from logoutUserService', error);
    throw error;
  }
}

module.exports = logoutUserService