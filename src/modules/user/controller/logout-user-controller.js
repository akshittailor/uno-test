const { logger } = require("../../../logger");
const { sendResponse, generateResponseJson } = require("../../../utils/response");
const logoutUserService = require('../services/logout')

const logoutUserV1 = async (req,res) => {
  try {
    const result = await logoutUserService(req,res);
    if(result && result.statusCode) {
      sendResponse(res,result)
    } else {
      sendResponse(res, generateResponseJson(result, 200, 'Success'));
    }
  } catch (error) {
    logger.error('Error form logoutUserV1', error);
    res.send(generateResponseJson({}, 500, 'Server Error'));
  }
}

module.exports = logoutUserV1