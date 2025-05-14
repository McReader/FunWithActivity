const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const client = new DynamoDBClient();

exports.handler = async (event) => {
  try {
    const command = new GetItemCommand({
      TableName: process.env.USER_STATS_TABLE,
      Key: marshall({
        userId: "550e8400-e29b-41d4-a716-446655440000"
      }),
    });

    const response = await client.send(command);

    let userStats;

    if (response.Item) {
      userStats = unmarshall(response.Item);
    } else {
      userStats = {};
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userStats)
    };

  } catch (error) {
    console.error('Error fetching user stats:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Error fetching user stats',
      })
    };
  }
};
