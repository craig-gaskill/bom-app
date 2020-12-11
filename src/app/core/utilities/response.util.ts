import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

/**
 * Defines common methods to be used when processing an HTTP Response.
 */
export abstract class ResponseUtil {
  /**
   * A function that takes in the {HttpErrorResponse} and returns it as an Observable for an error notification.
   *
   * @param error
   *    The {@HttpErrorResponse} to pass to the error notification.
   */
  public static handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    return throwError(error);
  }
}
