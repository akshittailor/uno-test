const { logger } = require("../../../logger");
const { sendResponse, generateResponseJson } = require("../../../utils/response");
const getLoggedInUserService = require('../services/get-profile')

const getLoggedInUserV1 = async (req,res) => {
  try {
    const user = req.user;
    const result = await getLoggedInUserService(user);
    if(result && result.statusCode) {
      sendResponse(res,result)
    } else {
      sendResponse(res, generateResponseJson(result, 200, 'Success'));
    }
  } catch (error) {
    logger.error('Error form getLoggedInUserV1', error);
    res.send(generateResponseJson({}, 500, 'Server Error'));
  }
}

module.exports = getLoggedInUserV1