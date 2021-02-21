/**
 * Provides commonly used methods for String operations.
 *
 * @author Craig Gaskill
 */
import {ObjectUtil} from './object.util';

export abstract class StringUtil {
  /**
   * Helper method to trim a string to 'undefined' if it has spaces or length of 0.
   *
   * @param value String to trim.
   *
   * @returns 'undefined' if the string is null, undefined, or if it has no content other than whitespace; otherwise,
   * returns the trimmed string.
   */
  public static trimToUndefined(value: string): string {
    if (!value) {
      return undefined;
    }

    const trimmedValue = value.trim();
    if (!trimmedValue || trimmedValue.length === 0) {
      return undefined;
    } else {
      return trimmedValue;
    }
  }

  /**
   * Helper method to determine if a string is empty after trimming for whitespace. Null-safe.
   *
   * @param str String to check.
   *
   * @returns True if the string is empty after calling trimToUndefined on it, false otherwise.
   */
  public static isEmpty(str: string): boolean {
    return !StringUtil.isNotEmpty(str);
  }

  /**
   * Helper method to determine if a string is not empty after trimming for whitespace. Null-safe.
   *
   * @param str String to check.
   *
   * @returns True if the string is not empty after calling trimToUndefined on it, false otherwise.
   */
  public static isNotEmpty(str: string): boolean {
    return ObjectUtil.isDefined(StringUtil.trimToUndefined(str));
  }
}
