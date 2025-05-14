exports.handler = async (event) => {
  try {
    const [resultA, resultB] = event;

    console.log(resultA, resultB);

    return {
      statusCode: 200,
    };
  } catch (error) {
    console.error('Error aggregating recommendations:', error);
    throw error;
  }
};
