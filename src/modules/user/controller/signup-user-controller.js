const { logger } = require("../../../logger");
const { sendResponse, generateResponseJson } = require("../../../utils/response");
const signupUserServiceV1 = require('../services/signup')

const signupUserV1 = async (req,res) => {
  try {
    const reqBody = req.body;
    const result =  await signupUserServiceV1(reqBody);
    if(result && result.statusCode) {
      sendResponse(res,result)
    } else {
      sendResponse(res, generateResponseJson(result, 200, 'Success'));
    }
  } catch (error) {
    logger.error('Error form signupUserV1', error);
    res.send(generateResponseJson({}, 500, 'Server Error'));
  }
}

module.exports = signupUserV1