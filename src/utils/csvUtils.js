const { createObjectCsvWriter, createObjectCsvStringifier } = require('csv-writer');
const fs = require('fs');
const path = require('path');

const writeToCsv = async (data, filename) => {
  const csvWriter = createObjectCsvWriter({
    path: path.join(__dirname, '..', filename),
    header: [
      { id: 'batch', title: 'Batch' },
      { id: 'name', title: 'Name' },
      { id: 'description', title: 'Description' },
      { id: 'email', title: 'Email' },
      { id: 'firstName', title: 'First Name' },
      { id: 'lastName', title: 'Last Name' }
    ],
    append: false,
    alwaysQuote: true
  });

  try {
    await csvWriter.writeRecords(data);
    console.log(`Data written successfully to ${filename}`);
  } catch (err) {
    console.error('Error writing to CSV file:', err);
    throw err;
  }
};

const appendToCsv = async (data, filename) => {
  const records = createObjectCsvStringifier({
    header: [
      { id: 'batch', title: 'Batch' },
      { id: 'name', title: 'Name' },
      { id: 'description', title: 'Description' },
      { id: 'email', title: 'Email' },
      { id: 'firstName', title: 'First Name' },
      { id: 'lastName', title: 'Last Name' }
    ]
  }).stringifyRecords(data);

  try {
    fs.appendFileSync(path.join(__dirname, '..', filename), records);
    console.log(`Appended data to ${filename}`);
  } catch (err) {
    console.error('Error appending to CSV file:', err);
    throw err;
  }
};

module.exports = {
  writeToCsv,
  appendToCsv
};
