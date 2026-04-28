import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(
    level: string,
    message: string | object,
    ...optionalParams: string[]
  ): string {
    const fields: Record<string, string> = {
      level,
      message: typeof message === 'object' ? JSON.stringify(message) : message,
    };
    if (optionalParams.length > 0 && optionalParams[0] !== undefined) {
      fields.context = optionalParams[0];
    }
    return (
      Object.entries(fields)
        .map(([key, value]) => `${key}=${value}`)
        .join('\t') + '\n'
    );
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
