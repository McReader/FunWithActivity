const {DynamoDBClient, UpdateItemCommand} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient();

exports.handler = async (event) => {
  try {
    const promises = event.Records.map(async (record) => {
      const payload = Buffer.from(record.kinesis.data, 'base64').toString();
      const activity = JSON.parse(payload);

      let command;

      switch (activity.type) {
        case 'body-params': {
          command = new UpdateItemCommand({
            TableName: "FunWithActivity-dev-user-stats",
            Key: {
              userId: { S: activity.userId },
            },
            ExpressionAttributeValues: {
              ':h': { N: activity.height?.toString() },
              ':w': { N: activity.weight?.toString() },
              ':timestamp': { S: new Date().toISOString() },
            },
            ReturnValues: 'ALL_NEW',
            UpdateExpression: 'SET height = :h, weight = :w, lastUpdatedAt = :timestamp',
          });
          break;
        }
        default:
          console.warn('Unknown activity type:', activity.type);
          return;
      }

      return client.send(command);
    });

    await Promise.all(promises);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successfully processed activities',
        recordCount: event.Records.length
      })
    };

  } catch (error) {
    console.error('Error processing activities:', error);
    throw error;
  }
};
