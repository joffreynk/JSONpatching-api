const winston = require('winston');
const expressWinston = require('express-winston');

// Create a Winston logger instance
const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
});

// Express middleware for logging HTTP requests
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  meta: true, // Log metadata such as query parameters
  msg: 'HTTP {{req.method}} {{req.url}}',
});

module.exports = { logger, requestLogger };
