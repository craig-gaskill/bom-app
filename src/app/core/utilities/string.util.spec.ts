import {StringUtil} from './string.util';

describe('StringUtil', () => {
  describe('trimToUndefined', () => {
    it('should return null when passed null', () => {
      const actual = StringUtil.trimToUndefined(null);
      expect(actual).toBeUndefined();
    });

    it('should return null when passed undefined', () => {
      const actual = StringUtil.trimToUndefined(undefined);
      expect(actual).toBeUndefined();
    });

    it('should return null when passed an empty string', () => {
      const actual = StringUtil.trimToUndefined('   ');
      expect(actual).toBeUndefined();
    });

    it('should return a trimmed string', () => {
      const actual = StringUtil.trimToUndefined('  Trim Me  ');
      expect(actual).toEqual('Trim Me');
    });
  });

  describe('isNotEmpty', () => {
    it('should return false when passed null', () => {
      const actual = StringUtil.isNotEmpty(null);
      expect(actual).toBeFalsy();
    });

    it('should return false when passed undefined', () => {
      const actual = StringUtil.isNotEmpty(undefined);
      expect(actual).toBeFalsy();
    });

    it('should return false when passed a string of whitespace', () => {
      const actual = StringUtil.isNotEmpty('   ');
      expect(actual).toBeFalsy();
    });

    it('should return true when passed a string with at least one non-whitespace character', () => {
      const actual = StringUtil.isNotEmpty('  Trim Me  ');
      expect(actual).toBeTruthy();
    });
  });

  describe('isEmpty', () => {
    it('should return true when passed null', () => {
      const actual = StringUtil.isEmpty(null);
      expect(actual).toBeTruthy();
    });

    it('should return true when passed undefined', () => {
      const actual = StringUtil.isEmpty(undefined);
      expect(actual).toBeTruthy();
    });

    it('should return true when passed a string of whitespace', () => {
      const actual = StringUtil.isEmpty('   ');
      expect(actual).toBeTruthy();
    });

    it('should return false when passed a string with at least one non-whitespace character', () => {
      const actual = StringUtil.isEmpty('  Trim Me  ');
      expect(actual).toBeFalsy();
    });
  });
});
