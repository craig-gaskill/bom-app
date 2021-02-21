import {ArrayUtil} from './array.util';

describe('ArrayUtil', () => {
  describe('isEmpty', () => {
    it('should return true when given an undefined value', () => {
      const undefinedValue = undefined;

      const actual = ArrayUtil.isEmpty(undefinedValue);
      expect(actual).toBeTruthy();
    });

    it('should return true when given a non-array value', () => {
      const numericValue = 2;

      const actual = ArrayUtil.isEmpty(numericValue);
      expect(actual).toBeTruthy();
    });

    it('should return true when given an empty array', () => {
      const emptyArray = [];

      const actual = ArrayUtil.isEmpty(emptyArray);
      expect(actual).toBeTruthy();
    });

    it('should return false when given a non-empty array', () => {
      const nonEmptyArray = [1];

      const actual = ArrayUtil.isEmpty(nonEmptyArray);
      expect(actual).toBeFalsy();
    });
  });

  describe('isNotEmpty', () => {
    it('should return false when given an undefined value', () => {
      const undefinedValue = undefined;

      const actual = ArrayUtil.isNotEmpty(undefinedValue);
      expect(actual).toBeFalsy();
    });

    it('should return false when given a non-array value', () => {
      const numericValue = 2;

      const actual = ArrayUtil.isNotEmpty(numericValue);
      expect(actual).toBeFalsy();
    });

    it('should return false when given an empty array', () => {
      const emptyArray = [];

      const actual = ArrayUtil.isNotEmpty(emptyArray);
      expect(actual).toBeFalsy();
    });

    it('should return true when given a non-empty array', () => {
      const emptyArray = [1];

      const actual = ArrayUtil.isNotEmpty(emptyArray);
      expect(actual).toBeTruthy();
    });
  });
});
