import {ObjectUtil} from './object.util';

describe('ObjectUtil', () => {
  describe('isDefined', () => {
    it('should return false when given an undefined value', () => {
      const undefinedValue = undefined;
      const actual = ObjectUtil.isDefined(undefinedValue);

      expect(actual).toBeFalse();
    });

    it('should return false when given a null value', () => {
      const nullValue = null;
      const actual = ObjectUtil.isDefined(nullValue);

      expect(actual).toBeFalse();
    });

    it ('should return true when given a numeric value', () => {
      const numericValue = 0;
      const actual = ObjectUtil.isDefined(numericValue);

      expect(actual).toBeTrue();
    });

    it ('should return true when given a boolean value', () => {
      const booleanValue = false;
      const actual = ObjectUtil.isDefined(booleanValue);

      expect(actual).toBeTrue();
    });

    it ('should return true when given a string value', () => {
      const stringValue = '';
      const actual = ObjectUtil.isDefined(stringValue);

      expect(actual).toBeTrue();
    });
  });

  describe('isUndefined', () => {
    it('should return true when given an undefined value', () => {
      const undefinedValue = undefined;
      const actual = ObjectUtil.isUndefined(undefinedValue);

      expect(actual).toBeTrue();
    });

    it('should return true when given a null value', () => {
      const nullValue = null;
      const actual = ObjectUtil.isUndefined(nullValue);

      expect(actual).toBeTrue();
    });

    it ('should return false when given a numeric value', () => {
      const numericValue = 0;
      const actual = ObjectUtil.isUndefined(numericValue);

      expect(actual).toBeFalse();
    });

    it ('should return false when given a boolean value', () => {
      const booleanValue = false;
      const actual = ObjectUtil.isUndefined(booleanValue);

      expect(actual).toBeFalse();
    });

    it ('should return false when given a string value', () => {
      const stringValue = '';
      const actual = ObjectUtil.isUndefined(stringValue);

      expect(actual).toBeFalse();
    });
  });

  describe('valueOrElse', () => {
    it('should return the defined number', () => {
      const numericValue = 123.45;
      const actual = ObjectUtil.valueOrElse(numericValue, 5);

      expect(actual).toEqual(numericValue);
    });

    it('should return the defined string', () => {
      const stringValue = 'test';
      const actual = ObjectUtil.valueOrElse(stringValue, 'failed');

      expect(actual).toEqual(stringValue);
    });

    it('should return the else value when undefined is provided', () => {
      const undefinedValue = undefined;
      const actual = ObjectUtil.valueOrElse(undefinedValue, 'other');

      expect(actual).toEqual('other');
    });

    it('should return the else value when null is provided', () => {
      const nullValue = null;
      const actual = ObjectUtil.valueOrElse(nullValue, 'other');

      expect(actual).toEqual('other');
    });
  });
});
