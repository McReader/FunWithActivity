exports.handler = async (event) => {
  try {
    for (const record of event.Records) {
      // Skip if this is not an INSERT or MODIFY event
      if (record.eventName !== 'INSERT' && record.eventName !== 'MODIFY') {
        continue;
      }

      // Get the new image (the current state of the item)
      const newImage = record.dynamodb.NewImage;

      console.log('Event Type:', record.eventName);
      console.log('New Image:', JSON.stringify(newImage, null, 2));

      // Here you can add your business logic to process the changes
      // For example:
      // - Send notifications
      // - Update other systems
      // - Trigger additional workflows
      // - etc.
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Successfully processed DynamoDB Stream events',
        recordCount: event.Records.length
      })
    };

  } catch (error) {
    console.error('Error processing DynamoDB Stream events:', error);
    throw error;
  }
};
