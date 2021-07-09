import * as config from 'config';
import { Service } from 'typedi';
import * as winston from 'winston';
import { Logger } from './logger.interface';

@Service()
export class LoggerService implements Logger {
  protected transports = [new winston.transports.Console()];
  protected client: winston.Logger = winston.createLogger({
    level: config.LOG_LEVEL,
    defaultMeta: { service: config.APP_NAME },
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    transports: this.transports,
  });

  public log(level: string, message: string, data?: any): void {
    this.client.log({
      level,
      message,
      data,
    });
  }

  public silly(message: string, data?: any): void {
    this.log('silly', message, data);
  }

  public debug(message: string, data?: any): void {
    this.log('debug', message, data);
  }

  public verbose(message: string, data?: any): void {
    this.log('verbose', message, data);
  }

  public info(message: string, data?: any): void {
    this.log('info', message, data);
  }

  public warn(message: string, data?: any): void {
    this.log('warn', message, data);
  }

  public error(message: string, data?: any): void {
    this.log('error', message, data);
  }
}
