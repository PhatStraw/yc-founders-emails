const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const YC_LIST_URL = 'https://www.ycombinator.com/companies?batch=W24&batch=S23';

const scrapeLatestBatchesWithPuppeteer = async () => {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(YC_LIST_URL, { waitUntil: 'networkidle2' });

    const content = await page.content();

    const $ = cheerio.load(content);
    let companies = [];
    $('div._rightCol_lx3q7_576 a div ._coName_lx3q7_454').each((index, element) => {
      companies.push({
        name: $(element).text(),
      });
    });
    $('div._rightCol_lx3q7_576 a div ._coDescription_lx3q7_479').each((index, element) => {
      companies[index].description = $(element).text();
    });
    return companies;
  } catch (error) {
    console.error('Scraping with Puppeteer failed:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = scrapeLatestBatchesWithPuppeteer;
