const { info, error } = require('./utils/logger');
const scrapeLatestBatchesWithPuppeteer = require('./scrapeWithPuppeteer');
const { findEmailsForDomain } = require('./hunterApi');
const { appendToCsv } = require('./utils/csvUtils');
const { delay } = require('./utils/delay');
const { loadEnvConfig } = require('./utils/envConfig');

const REQUEST_DELAY_MS = 2000;
const CSV_FILENAME = 'companies.csv';

const main = async () => {
  try {
    loadEnvConfig();
    info('Starting main function execution.');
    const companies = await scrapeLatestBatchesWithPuppeteer();
    for (const company of companies) {
      await delay(REQUEST_DELAY_MS);
      try {
        const emails = await findEmailsForDomain(company.name);
        const enrichedCompany = {
          ...company,
          email: emails.length > 0 ? emails[0].value : '',
          firstName: emails.length > 0 ? emails[0].firstName : '',
          lastName: emails.length > 0 ? emails[0].lastName : '',
        };
        await appendToCsv([enrichedCompany], CSV_FILENAME);
        info(`Processed company ${company.name}`);
      } catch (err) {
        error(`An error occurred while processing company ${company.name}: ${err.message}`);
      }
    }
    info('Finished main function execution.');
  } catch (err) {
    error('An error occurred in main execution:', err);
  }
};

module.exports = { main };
