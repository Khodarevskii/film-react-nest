import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  formatMessage(level: string, message: string | object, ...optionalParams: string[]): string {
    return JSON.stringify({ level, message, optionalParams });
  }

  log(message: string | object, ...optionalParams: string[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: string | object, ...optionalParams: string[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: string | object, ...optionalParams: string[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: string | object, ...optionalParams: string[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: string | object, ...optionalParams: string[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }
}
