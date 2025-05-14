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
  const userId = record.userId;
  const height = record.height;
  const weight = record.weight;

  const response = await axios.post('https://a2da22tugdqsame4ckd3oohkmu0tnbne.lambda-url.eu-central-1.on.aws/services/service1', {
    "height": 184.0,
    "weight": 84.0,
    "token": "service1-dev"
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
    source: "serviceA",
    title: rec.recommendation,
    priority: rec.confidence * 1000,
  }));

  return { userId, recommendations }
}
