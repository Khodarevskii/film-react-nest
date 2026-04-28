import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  describe('formatMessage', () => {
    it('should return valid JSON string', () => {
      const result = logger.formatMessage('log', 'test message');
      expect(() => JSON.parse(result)).not.toThrow();
    });

    it('should include level and message fields', () => {
      const result = logger.formatMessage('log', 'test message');
      const parsed = JSON.parse(result);
      expect(parsed.level).toBe('log');
      expect(parsed.message).toBe('test message');
    });

    it('should include optionalParams when provided', () => {
      const result = logger.formatMessage(
        'error',
        'error message',
        'MyContext',
      );
      const parsed = JSON.parse(result);
      expect(parsed.optionalParams).toBeDefined();
      expect(parsed.optionalParams).toContain('MyContext');
    });

    it('should have empty optionalParams when none provided', () => {
      const result = logger.formatMessage('log', 'msg');
      const parsed = JSON.parse(result);
      expect(parsed.optionalParams).toEqual([]);
    });

    it('should handle non-string message values', () => {
      const result = logger.formatMessage('log', { key: 'value' });
      const parsed = JSON.parse(result);
      expect(parsed.message).toEqual({ key: 'value' });
    });
  });

  describe('log', () => {
    it('should call console.log with JSON containing level=log', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation();
      logger.log('test message');
      expect(spy).toHaveBeenCalledTimes(1);
      const arg = spy.mock.calls[0][0];
      expect(JSON.parse(arg).level).toBe('log');
      spy.mockRestore();
    });
  });

  describe('error', () => {
    it('should call console.error with JSON containing level=error', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation();
      logger.error('error message');
      expect(spy).toHaveBeenCalledTimes(1);
      const arg = spy.mock.calls[0][0];
      expect(JSON.parse(arg).level).toBe('error');
      spy.mockRestore();
    });
  });

  describe('warn', () => {
    it('should call console.warn with JSON containing level=warn', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation();
      logger.warn('warn message');
      expect(spy).toHaveBeenCalledTimes(1);
      const arg = spy.mock.calls[0][0];
      expect(JSON.parse(arg).level).toBe('warn');
      spy.mockRestore();
    });
  });

  describe('debug', () => {
    it('should call console.debug with JSON containing level=debug', () => {
      const spy = jest.spyOn(console, 'debug').mockImplementation();
      logger.debug('debug message');
      expect(spy).toHaveBeenCalledTimes(1);
      const arg = spy.mock.calls[0][0];
      expect(JSON.parse(arg).level).toBe('debug');
      spy.mockRestore();
    });
  });

  describe('verbose', () => {
    it('should call console.log with JSON containing level=verbose', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation();
      logger.verbose('verbose message');
      expect(spy).toHaveBeenCalledTimes(1);
      const arg = spy.mock.calls[0][0];
      expect(JSON.parse(arg).level).toBe('verbose');
      spy.mockRestore();
    });
  });
});
