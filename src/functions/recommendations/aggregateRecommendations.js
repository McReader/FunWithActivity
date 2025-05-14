const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  DeleteCommand
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

const handler = async (event) => {
  try {
    const userIds = new Set(event.flatMap(result => Object.keys(result)));

    await deleteExistingRecommendations(userIds);

    const mergedRecommendations = mergeRecommendations(event);

    await storeRecommendations(mergedRecommendations);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successfully aggregated recommendations',
        processedUsers: userIds.size,
        recommendationsCount: Object.keys(mergedRecommendations).length
      })
    };

  } catch (error) {
    console.error('Error aggregating recommendations:', error);
    throw error;
  }
};

async function deleteExistingRecommendations(userIds) {
  const deletePromises = Array.from(userIds).map(userId => {
    const deleteCommand = new DeleteCommand({
      TableName: process.env.RECOMMENDATIONS_TABLE,
      Key: {
        id: 'recommendations' // assuming this is your primary key
      },
      ConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    });
    return docClient.send(deleteCommand);
  });

  // Some deletes might fail if records don't exist, that's OK
  await Promise.allSettled(deletePromises);
}

function mergeRecommendations(resultsArray) {
  const mergedRecommendations = {};

  resultsArray.forEach(resultSet => {
    const userId = Object.keys(resultSet)[0];
    const recommendations = resultSet[userId];

    if (!mergedRecommendations[userId]) {
      mergedRecommendations[userId] = new Map();
    }

    recommendations.forEach(rec => {
      const key = `${rec.title}-${rec.details}`;
      const existingRec = mergedRecommendations[userId].get(key);

      if (!existingRec || existingRec.priority < rec.priority) {
        mergedRecommendations[userId].set(key, rec);
      }
    });
  });

  Object.keys(mergedRecommendations).forEach(userId => {
    mergedRecommendations[userId] = Array.from(mergedRecommendations[userId].values());
  });

  return mergedRecommendations;
}

async function storeRecommendations(mergedRecommendations) {
  const storePromises = Object.entries(mergedRecommendations).map(([userId, recommendations]) => {
    const putCommand = new PutCommand({
      TableName: process.env.RECOMMENDATIONS_TABLE,
      Item: {
        id: 'recommendations', // your primary key
        userId: userId,
        recommendations,
        updatedAt: new Date().toISOString()
      }
    });
    return docClient.send(putCommand);
  });

  await Promise.all(storePromises);
}

module.exports = {
  handler
};
