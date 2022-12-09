const { default: axios } = require("axios");
const { logger } = require("../../../logger");

const getRandomJokeV1 = async () => {
  try {
    const norrisCall = await axios({
      method:'get',
      url:'https://api.chucknorris.io/jokes/random',
      headers: {
        'Accept-Encoding': 'application/json',
    }
    });
    const { data:{ value } = ''} = norrisCall
    return {
      joke:value
    }
    console.log(JSON.stringify(norrisCall.data));
  } catch (error) {
    logger.error('Error from getRandomJokeV1', error);
    throw error;
  }
}

module.exports = getRandomJokeV1