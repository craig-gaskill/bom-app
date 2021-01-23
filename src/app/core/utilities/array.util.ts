/**
 * Provides commonly used methods for Array operations.
 *
 * @author Craig Gaskill
 */
import {ObjectUtil} from './object.util';

export abstract class ArrayUtil {
  /**
   * Checks whether the given parameter is defined (not null or undefined)
   * is an array and has elements.
   *
   * @param ary
   *    The value to validate
   */
  public static isEmpty(ary: any[]): boolean {
    if (ObjectUtil.isUndefined(ary)) {
      return true;
    } else if (!(ary instanceof Array)) {
      return true;
    } else {
      return ary.length === 0;
    }
  }

  /**
   * Checks whether the given parameter is not empty (is defined and has values).
   *
   * @param ary
   *    Thew value to validate
   */
  public static isNotEmpty(ary: any[]): boolean {
    return !this.isEmpty(ary);
  }
}
