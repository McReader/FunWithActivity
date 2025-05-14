const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

const client = new DynamoDBClient();

exports.handler = async (event) => {
  const mergedRecommendations = mergeRecommendations(event);
  const userIds = Array.from(new Set(Object.keys(mergedRecommendations)));

  const promises = userIds.map((userId) => updateUserRecommendations(mergedRecommendations, userId));

  await Promise.all(promises);
};

function updateUserRecommendations(mergedRecommendations, userId) {
  const userRecommendations = mergedRecommendations[userId];
  const command = new UpdateItemCommand({
    TableName: process.env.RECOMMENDATIONS_TABLE,
    Key: {
      userId: { S: userId.toString() },
    },
    ExpressionAttributeValues: marshall({
      ':recommendations': userRecommendations,
      ':timestamp': new Date().toISOString(),
    }),
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'SET recommendations = :recommendations, lastUpdatedAt = :timestamp',
  });
  return client.send(command);
}

function mergeRecommendations(sources) {
  return sources.reduce((acc, value) => {
    const entries = Object.entries(value);

    if (!entries.length) {
      return acc;
    }

    const [userId, recommendations] = entries[0];

    if (!acc[userId]) {
      acc[userId] = recommendations;
    } else {
      acc[userId].push(...recommendations);
    }

    return acc;
  }, {});
}
