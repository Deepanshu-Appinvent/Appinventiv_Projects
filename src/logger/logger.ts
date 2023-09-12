import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "loggingFiles/%DATE%.log", 
      datePattern: "YYYY-MM-DD", 
    }),
  ],
});

export default logger;

















/*
 * Using npm log levels: { error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6 }
* logger.error("This is an error message");    // Logs at the 'error' level
* logger.warn("This is a warning message");    // Logs at the 'warn' level
* logger.info("This is an info message");      // Logs at the 'info' level
* logger.http("This is an HTTP message");      // Logs at the 'http' level
* logger.verbose("This is a verbose message"); // Logs at the 'verbose' level
* logger.debug("This is a debug message");     // Logs at the 'debug' level
* logger.silly("This is a silly message");     // Logs at the 'silly' level
*/

