const createErrorResponse = (ex, res) => {
  const { statusCode = 400, message } = ex;
  return res.status(statusCode).json({
    status: 'FAIL',
    statusCode,
    message,
  });
};

const generateResponseJson = (response, responseStatusCode, responseStatusMessage) => {
  const responseData = response || [];
  return {
    data: responseData,
    statusCode: responseStatusCode,
    statusMessage: responseStatusMessage,
  };
};

const sendResponse = async (res, responseJson) => {
  if (responseJson.statusCode !== 204) {
    res.status(responseJson.statusCode);
  }
  res.send(responseJson);
};

module.exports = {
  createErrorResponse,
  generateResponseJson,
  sendResponse,
};
