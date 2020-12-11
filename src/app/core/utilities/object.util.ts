/**
 * Provides commonly used methods for evaluating the value of an Object.
 *
 * @author Craig Gaskill
 */
export abstract class ObjectUtil {
  /**
   * Checks whether the given parameter is defined (not null or defined).
   *
   * These given data values will return these values.
   * undefined  = false;
   * null       = false;
   * 0          = true;
   * false      = true;
   * ""         = true;
   *
   * @param data
   *    The value to validate.
   *
   * @returns
   *    [true] if not null or not undefined. false if null or undefined.
   */
  public static isDefined(data: any): boolean {
    return (data != undefined);
  }

  /**
   * Checks whether the given parameter is null or undefined.
   *
   * These given data values will return these values.
   * undefined  = true;
   * null       = true;
   * 0          = false;
   * false      = false;
   * ""         = false;
   *
   * @param data
   *    The value to validate.
   *
   * @returns
   *    [true] if the value is either null or undefined.
   */
  public static isUndefined(data: any): boolean {
    return data == undefined;
  }

  /**
   * Will return the value if it is defined and non-null; otherwise, it will return the 'other' value.
   *
   * @param data
   *    The value to validate.
   * @param other
   *    The value to return if the specified 'data' is undefined or null.
   *
   * @return The original value (if defined and non-null); otherwise, the 'other' value.
   */
  public static valueOrElse(data: any, other: any): any {
    return ObjectUtil.isDefined(data) ? data : other;
  }
}
