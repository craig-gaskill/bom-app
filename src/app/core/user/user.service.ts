import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

import {User} from "./user.model";
import {ObjectUtil} from "../utilities/object.util";
import {environment} from "../../../environments/environment";
import {ResponseUtil} from "../utilities/response.util";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _SERVICE_URL: string = environment.bomServiceUrl + '/users';

  constructor(private _httpClient: HttpClient) { }

  /**
   * Gets a list of Users.
   *
   * @param start
   *    The position in the collection to start retrieving Users from.
   * @param limit
   *    The maximum number of Users to retrieve.
   * @param searchText
   *    A {String} the defines addition search criteria to qualify Users on.
   * @param includeInactive
   *    Indicates if inactive records should also be returned.
   */
  public getUsers(start = 0, limit = 25, searchText?: string, includeInactive = false
  ): Observable<User[]> {
    let params = new HttpParams()
      .set("start", start.toString())
      .set("limit", limit.toString())
      .set("includeInactive", includeInactive.toString());

    if (ObjectUtil.isDefined(searchText)) {
      params = params.set("searchText", searchText);
    }

    return this._httpClient.get<User[]>(this._SERVICE_URL, {params})
      .pipe(
        catchError(ResponseUtil.handleError)
      );
  }

  /**
   * GET a specific User based upon its unique identifier.
   *
   * @param userId
   *    The unique identifier of the User to retrieve.
   */
  public getUserById(userId: number): Observable<User> {
    return this._httpClient.get<User>(`${this._SERVICE_URL}/${userId}`)
      .pipe(
        catchError(ResponseUtil.handleError)
      );
  }

  /**
   * GET a specific User based upon the email address.
   *
   * @param email
   *    The email address of the User to retrieve.
   */
  public getUserByEmail(email: string): Observable<User> {
    return this._httpClient.get<User>(`${this._SERVICE_URL}/${email}`)
      .pipe(
        catchError(ResponseUtil.handleError)
      );
  }

  /**
   * Checks to see if a user exists for the given email.
   *
   * @param email
   *    The email address to check.
   */
  public checkUserForEmail(email: string): Observable<boolean> {
    return this._httpClient.head<boolean>(`${this._SERVICE_URL}/${email}`, {observe: 'response'})
      .pipe(
        map(response => response.status === 200)
      );
  }
}
