const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const client = new DynamoDBClient();

exports.handler = async () => {
  try {
    const command = new GetItemCommand({
      TableName: process.env.RECOMMENDATIONS_TABLE,
      Key: marshall({
        userId: "550e8400-e29b-41d4-a716-446655440000"
      }),
    });

    const response = await client.send(command);

    let recommendations;

    if (response.Item) {
      recommendations = unmarshall(response.Item);
    } else {
      recommendations = [];
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recommendations)
    };

  } catch (error) {
    console.error('Error fetching recommendations:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Error fetching recommendations',
      })
    };
  }
};
