const { logger } = require("../../../logger");
const { sendResponse, generateResponseJson } = require("../../../utils/response");
const getRandomJokeV1 = require('../services/get-random-joke')

const getMyJokeControllerV1 = async (req,res) => {
  try {
    const result = await getRandomJokeV1();
    if(result && result.statusCode) {
      sendResponse(res,result)
    } else {
      sendResponse(res, generateResponseJson(result, 200, 'Success'));
    }
  } catch (error) {
    logger.error('Error form getMyJokeControllerV1', error);
    res.send(generateResponseJson({}, 500, 'Server Error'));
  }
}

module.exports = getMyJokeControllerV1