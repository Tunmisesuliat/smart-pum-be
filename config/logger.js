import winston from 'winston';

/**
 * Returns a logger instance based on the environment.
 *
 * @param {string} env - The environment ('production', 'development', 'test', or undefined).
 * @returns {winston.Logger} - The logger instance.
 */
const logger = (env) => {
  let transports = [];

  if (env === 'production') {
    transports = [
      new winston.transports.Console({
        level: 'error',
        handleExceptions: true,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      }),
      new winston.transports.File({
        level: 'info',
        filename: './server.log',
        handleExceptions: true,
        format: winston.format.json(),
        maxsize: 5242880, // 5MB
        maxFiles: 100,
      }),
    ];
  } else if (env === 'development') {
    transports = [
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      }),
      new winston.transports.File({
        level: 'info',
        filename: './server.log',
        handleExceptions: true,
        format: winston.format.json(),
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
    ];
  } else if (env === 'test') {
    transports = [
      new winston.transports.File({
        level: 'info',
        filename: './test.log',
        handleExceptions: true,
        format: winston.format.json(),
        maxsize: 5242880, // 5MB
        maxFiles: 50,
      }),
    ];
  } else {
    // Default logger
    transports = [
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      }),
    ];
  }

  const loggerInstance = winston.createLogger({
    level: 'debug',
    transports,
    exitOnError: false,
  });

  loggerInstance.stream = {
    /**
     * A write stream for winston that logs the message to the
     * info level of the logger.
     * @param {string} message - The message to log
     */
    write: (message) => {
      loggerInstance.info(message.trim());
    },
  };

  return loggerInstance;
};

export default logger;
