const axios = require('axios');
const dotenv = require('dotenv');
const { handleHunterApiError } = require('./utils/hunterApiErrorHandler');

dotenv.config();

const findEmailsForDomain = async (company) => {
  const endpoint = `https://api.hunter.io/v2/domain-search?company=${company}&api_key=${process.env.HUNTER_API_KEY}`;
  try {
    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status !== 200 || !response.data || !response.data.data) {
      throw new Error(`Unsuccessful response from Hunter.io API`);
    }

    const emails = response.data.data.emails.map(email => {
      return {
        value: email.value,
        type: email.type,
        confidence: email.confidence,
        firstName: email.first_name,
        lastName: email.last_name
      };
    });

    return emails;
  } catch (error) {
    handleHunterApiError(error, company);
    throw error;
  }
};

module.exports = {
  findEmailsForDomain
};