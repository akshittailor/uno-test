const { logger } = require("../../../logger");
const { generateResponseJson, sendResponse } = require("../../../utils/response");
const loginUserServiceV1 = require('../services/login')

const loginUserV1 = async (req,res) => {
  try {
    const reqBody = req.body;
    const result =  await loginUserServiceV1(reqBody);
    if(result && result.statusCode) {
      sendResponse(res,result)
    } else if(result && result.token) { 
      const options = {
        expire:new Date() + 24 * 60 * 60 * 100
      }
      res.cookie("token",result.token,options)
      res.send(generateResponseJson(result,200,'Success'))
    };
  } catch (error) {
    logger.error('Error form loginUserV1', error);
    res.send(generateResponseJson({}, 500, 'Server Error'));
  }
}

module.exports = loginUserV1