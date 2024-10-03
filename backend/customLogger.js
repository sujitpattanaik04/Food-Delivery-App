const winston = require("winston");
const { combine, timestamp, printf, json, prettyPrint, errors, cli } =
  winston.format;
const DailyRotateFile = require("winston-daily-rotate-file");

const logger = winston.createLogger({
  // format: winston.format.cli(),
  // format: winston.format.json(),
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss",
    }),
    printf(
      (el) => `[${el.timestamp}] ${el.level.toUpperCase()}: ${el.message}`
    ),
    errors({ stack: true })
  ),
  transports: [
    new winston.transports.Console({ level: "silly", format: cli() }),
    // new winston.transports.File({ filename: "combined.log" }),
    new DailyRotateFile({
      level: "silly",
      filename: "logs/winston-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

const customFormat = ":method :url :status :res[content-length] :response-time";

module.exports = { logger, customFormat };
