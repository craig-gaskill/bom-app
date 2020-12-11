import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

import {environment} from "../../../environments/environment";
import {Role, RoleUtil} from "./role.model";
import {ObjectUtil} from "../utilities/object.util";
import {ResponseUtil} from "../utilities/response.util";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly _SERVICE_URL: string = environment.bomServiceUrl + '/roles';

  constructor(private _httpClient: HttpClient) { }

  /**
   * Gets a list of Roles.
   *
   * @param start
   *    The position in the collection to start retrieving Roles from.
   * @param limit
   *    The maximum number of Roles to retrieve.
   * @param searchText
   *    A {@link String} the defines addition search criteria to qualify Roles on.
   * @param includeInactive
   *    Indicates if inactive records should also be returned.
   */
  public getRoles(start = 0, limit = 25, searchText?: string, includeInactive = false
  ): Observable<Role[]> {
    let params = new HttpParams()
      .set("start", start.toString())
      .set("limit", limit.toString())
      .set("includeInactive", includeInactive.toString());

    if (ObjectUtil.isDefined(searchText)) {
      params = params.set("searchText", searchText);
    }

    return this._httpClient.get<Role[]>(this._SERVICE_URL, {params})
      .pipe(
        map(RoleUtil.deserializeRoles),
        catchError(ResponseUtil.handleError)
      );
  }

  /**
   * Get a specific {@link Role} by its unique identifier.
   *
   * @param roleId
   *    The unique identifier of the Role to retrieve.
   * @param include
   *    An optional array of additional elements to retrieve with the Role.
   */
  public getRole(roleId: number, include: string[] = []): Observable<Role> {
    let params = new HttpParams();
    if (include && include.length > 0) {
      for (const inc of include) {
        params = params.append('with', inc);
      }
    }

    return this._httpClient.get<Role>(`${this._SERVICE_URL}/${roleId}`, {params})
      .pipe(
        catchError(ResponseUtil.handleError)
      );
  }

  /**
   * Create a {@link Role}.
   *
   * @param role
   *    The {@link Role} to create / persist.
   */
  public createRole(role: Role): Observable<Role> {
    return this._httpClient.post<Role>(`${this._SERVICE_URL}`, RoleUtil.serializeRole(role))
      .pipe(
        map(RoleUtil.deserializeRole),
        catchError(ResponseUtil.handleError)
      );
  }

  /**
   * Update a {@link Role}.
   *
   * @param role
   *    The {@link Role} to update / persist.
   */
  public updateRole(role: Role): Observable<Role> {
    return this._httpClient.put<Role>(`${this._SERVICE_URL}/${role.roleId}`, RoleUtil.serializeRole(role))
      .pipe(
        map(RoleUtil.deserializeRole),
        catchError(ResponseUtil.handleError)
      );
  }
}
