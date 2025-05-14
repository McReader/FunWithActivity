const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
  const records = event.Records;

  const promises = records.map(async (record) => fetchUserRecommendations(record));

  const results = await Promise.all(promises);

  return results.reduce((acc, { userId, recommendations }) => {
    acc[userId] = recommendations;
    return acc;
  }, {});
};

const fetchUserRecommendations = async (record) => {
  const { userId, height, weight } = record;

  const response = await axios.post(process.env.API_URL, {
    "measurements": {
      "mass": 184.0,
      "height": 6.036
    },
    "birth_date": 1615876858,
    "session_token": uuidv4(),
  });

  const { statusCode, body } = response.data;

  if (statusCode !== 200) {
    throw new Error(`Service B error: [${statusCode}] ${body?.errorMessage || 'Unknown error'}`);
  }

  let responseJSON;
  try {
    responseJSON = JSON.parse(body);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw new Error('Failed to parse response from Service B');
  }

  const recommendations = responseJSON?.map((rec) => ({
    source: "serviceB",
    title: rec.title,
    details: rec.details,
    priority: rec.priority,
  }));

  return { userId, recommendations }
}
