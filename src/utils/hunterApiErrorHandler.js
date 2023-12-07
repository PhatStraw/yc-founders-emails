// This is a dedicated error handler for Hunter API responses and error codes.
const { error: logError } = require('./logger');

const handleHunterApiError = (err, company) => {
  if (err.response) {
    const { status, data } = err.response;
    switch (status) {
      case 429:
        logError(`Hit rate limit while processing company ${company}: ${JSON.stringify(data)}`);
        break;
      case 401:
        logError(`Unauthorized access for company ${company}: ${JSON.stringify(data)}`);
        break;
      default:
        logError(`Error occurred with status ${status} for company ${company}: ${JSON.stringify(data)}`);
    }
  } else {
    logError(`Failed to retrieve emails from Hunter.io for company ${company}: ${err.message}`);
  }
};

module.exports = { handleHunterApiError };
