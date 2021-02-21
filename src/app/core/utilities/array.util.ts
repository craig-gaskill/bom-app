/**
 * Provides commonly used methods for Array operations.
 *
 * @author Craig Gaskill
 */

export abstract class ArrayUtil {
  /**
   * Checks whether the given parameter is defined (not null or undefined)
   * is an array and has elements.
   *
   * @param value
   *    The value to validate
   */
  public static isEmpty(value: any): boolean {
    return !(value instanceof Array) || value.length === 0;
  }

  /**
   * Checks whether the given parameter is not empty (is defined and has values).
   *
   * @param value
   *    Thew value to validate
   */
  public static isNotEmpty(value: any): boolean {
    return !this.isEmpty(value);
  }
}
