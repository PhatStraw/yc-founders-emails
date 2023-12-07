const fs = require('fs');
const path = require('path');
const logFilePath = path.join(__dirname, '..', '..', 'logs', 'app.log');

const logToFile = (level, message) => {
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, '');
  }
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${level}: ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
};

module.exports = {
  info: (msg) => logToFile('INFO', msg),
  error: (msg) => logToFile('ERROR', msg)
};
