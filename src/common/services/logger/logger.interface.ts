export interface Logger {
  log(message: any, data?: any);
  silly(message: any, data?: any);
  debug(message: any, data?: any);
  verbose(message: any, data?: any);
  info(message: any, data?: any);
  warn(message: any, data?: any);
  error(message: any, data?: any);
}
