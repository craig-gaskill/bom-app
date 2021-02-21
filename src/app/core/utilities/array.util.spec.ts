import {ArrayUtil} from './array.util';

describe('ArrayUtil', () => {
  describe('isEmpty', () => {
    it('should return true when given an undefined value', () => {
      const undefinedValue = undefined;
      const actual = ArrayUtil.isEmpty(undefinedValue);

      expect(actual).toBeTrue();
    });

    it('should return true when given a non-array value', () => {
      const numericValue = 2;
      const actual = ArrayUtil.isEmpty(numericValue);

      expect(actual).toBeTrue();
    });

    it('should return true when given an empty array', () => {
      const emptyArray = [];
      const actual = ArrayUtil.isEmpty(emptyArray);

      expect(actual).toBeTrue();
    });

    it('should return false when given a non-empty array', () => {
      const nonEmptyArray = [1];
      const actual = ArrayUtil.isEmpty(nonEmptyArray);

      expect(actual).toBeFalse();
    });
  });

  describe('isNotEmpty', () => {
    it('should return false when given an undefined value', () => {
      const undefinedValue = undefined;
      const actual = ArrayUtil.isNotEmpty(undefinedValue);

      expect(actual).toBeFalse();
    });

    it('should return false when given a non-array value', () => {
      const numericValue = 2;
      const actual = ArrayUtil.isNotEmpty(numericValue);

      expect(actual).toBeFalse();
    });

    it('should return false when given an empty array', () => {
      const emptyArray = [];
      const actual = ArrayUtil.isNotEmpty(emptyArray);

      expect(actual).toBeFalse();
    });

    it('should return true when given a non-empty array', () => {
      const emptyArray = [1];
      const actual = ArrayUtil.isNotEmpty(emptyArray);

      expect(actual).toBeTrue();
    });
  });
});
