import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { createLogger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const infoLog = (appName, logDir): DailyRotateFile =>
  new DailyRotateFile({
    dirname: `${logDir}/info`,
    level: 'info',
    filename: `${appName}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d',
  });

const errorLog = (appName, logDir): DailyRotateFile =>
  new DailyRotateFile({
    dirname: `${logDir}/error`,
    level: 'error',
    filename: `${appName}-error-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '30d',
  });
export const logger = (appName, logDir) => {
  const instance = createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike(appName, {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
      infoLog(appName, logDir),
      errorLog(appName, logDir),
    ],
  });
  return WinstonModule.createLogger({
    instance,
  });
};
