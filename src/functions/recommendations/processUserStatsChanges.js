const { SFNClient, StartExecutionCommand } = require("@aws-sdk/client-sfn");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const sfnClient = new SFNClient();

exports.handler = async (event) => {
  try {
    const records = event.Records
      .filter(record => record.eventName === 'INSERT' || record.eventName === 'MODIFY')
      .map(record => unmarshall(record.dynamodb.NewImage));

    const command = new StartExecutionCommand({
      stateMachineArn: process.env.STATE_MACHINE_ARN,
      input: JSON.stringify({
        Records: records,
      })
    });

    await sfnClient.send(command);

    return { statusCode: 200 };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
