// File to ensure the .env variables are loaded correctly.
const dotenv = require('dotenv');
const { error } = require('./logger');

const loadEnvConfig = () => {
  const result = dotenv.config();
  if (result.error) {
    error('Failed to load the .env file:', result.error);
    throw result.error;
  }
  if (!process.env.HUNTER_API_KEY) {
    const missingKeyError = new Error('HUNTER_API_KEY is not defined in the .env file.');
    error(missingKeyError.message);
    throw missingKeyError;
  }
};

module.exports = { loadEnvConfig };
