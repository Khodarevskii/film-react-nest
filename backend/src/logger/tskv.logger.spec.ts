import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  describe('formatMessage', () => {
    it('should contain level and message fields in key=value format', () => {
      const result = logger.formatMessage('log', 'test message');
      expect(result).toContain('level=log');
      expect(result).toContain('message=test message');
    });

    it('should separate fields with tab character', () => {
      const result = logger.formatMessage('log', 'test message');
      const trimmed = result.trim();
      const parts = trimmed.split('\t');
      expect(parts.length).toBeGreaterThanOrEqual(2);
    });

    it('should end with newline character', () => {
      const result = logger.formatMessage('log', 'test');
      expect(result.endsWith('\n')).toBe(true);
    });

    it('should include context field when optionalParam provided', () => {
      const result = logger.formatMessage('log', 'test message', 'MyContext');
      expect(result).toContain('context=MyContext');
    });

    it('should not include context field when no optionalParams', () => {
      const result = logger.formatMessage('log', 'test message');
      expect(result).not.toContain('context=');
    });

    it('should convert message to string', () => {
      const result = logger.formatMessage('log', 42);
      expect(result).toContain('message=42');
    });
  });

  describe('log', () => {
    it('should call console.log with TSKV formatted string containing level=log', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation();
      logger.log('test message');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toContain('level=log');
      spy.mockRestore();
    });
  });

  describe('error', () => {
    it('should call console.error with TSKV formatted string containing level=error', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation();
      logger.error('error message');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toContain('level=error');
      spy.mockRestore();
    });
  });

  describe('warn', () => {
    it('should call console.warn with TSKV formatted string containing level=warn', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation();
      logger.warn('warn message');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toContain('level=warn');
      spy.mockRestore();
    });
  });

  describe('debug', () => {
    it('should call console.debug with TSKV formatted string containing level=debug', () => {
      const spy = jest.spyOn(console, 'debug').mockImplementation();
      logger.debug('debug message');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toContain('level=debug');
      spy.mockRestore();
    });
  });

  describe('verbose', () => {
    it('should call console.log with TSKV formatted string containing level=verbose', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation();
      logger.verbose('verbose message');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toContain('level=verbose');
      spy.mockRestore();
    });
  });
});
