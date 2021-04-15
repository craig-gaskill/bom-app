import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {environment} from '../../../../environments/environment';
import {DictionaryValue, DictionaryValueUtil} from './dictionary-value.model';
import {ResponseUtil} from '../../utilities/response.util';

@Injectable({
  providedIn: 'root'
})
export class DictionaryValueService {
  private readonly _SERVICE_URL: string = environment.bomServiceUrl + '/dictionaries';

  constructor(private _httpClient: HttpClient) { }

  /**
   * Get a list of dictionary values from a given dictionary.
   *
   * @param dictionaryMeaning
   *    The dictionary to get values from.
   * @param start
   *    The position in the collection to start retrieving Dictionary Values from.
   * @param limit
   *    The maximum number of Dictionary Values to retrieve.
   * @param name
   *    Optional search parameter used to filter the returned results.
   * @param includeInactive
   *    Indicates if inactive records should also be returned.
   *
   * @returns An {@link Observable} of {@link DictionaryValue} objects.
   */
  public getDictionaryValues(dictionaryMeaning: string,
                             start = 0,
                             limit = 25,
                             name: string = null,
                             includeInactive = false
  ): Observable<DictionaryValue[]> {
    let params = new HttpParams()
      .set('start', start.toString())
      .set('limit', limit.toString())
      .set('includeInactive', includeInactive.toString());

    if (name != null) {
      params = params.set('name', name);
    }

    const url = `${this._SERVICE_URL}/${dictionaryMeaning}/values`;

    return this._httpClient.get<DictionaryValue[]>(url, {params})
      .pipe(
        map(DictionaryValueUtil.deserializeDictionaryValues),
        catchError(ResponseUtil.handleError)
      );
  }

  /**
   * Get a single {@link DictionaryValue} from a given dictionary.
   *
   * @param dictionaryMeaning
   *    The dictionary to get a value from.
   * @param dictionaryValue
   *    The ID or Meaning of the dictionary value to retrieve.
   * @param include
   *    An optional array of additional elements to retrieve with the Role.
   *
   * @returns An {@link Observable} representing a {@link DictionaryValue} object or null.
   */
  public getDictionaryValue(dictionaryMeaning: string, dictionaryValue: number|string, include: string[] = []
  ): Observable<DictionaryValue> {
    let params = new HttpParams();
    if (include && include.length > 0) {
      for (const inc of include) {
        params = params.append('with', inc);
      }
    }

    const url = `${this._SERVICE_URL}/${dictionaryMeaning}/values/${dictionaryValue}`;

    return this._httpClient.get<DictionaryValue>(url, {params})
      .pipe(
        map(DictionaryValueUtil.deserializeDictionaryValue),
        catchError(ResponseUtil.handleError)
      );
  }

  /**
   * Create a {@link DictionaryValue} in a given dictionary.
   *
   * @param meaning
   *    The dictionary to add a value to.
   * @param dictionaryValue
   *    The value to add.
   *
   * @returns An {@link Observable} that returns the added {@link DictionaryValue}, null if not added.
   */
  public createDictionaryValue(meaning: string, dictionaryValue: DictionaryValue): Observable<DictionaryValue> {
    const url = `${this._SERVICE_URL}/${meaning}/values`;

    return this._httpClient.post<DictionaryValue>(url, DictionaryValueUtil.serializeDictionaryValue(dictionaryValue))
      .pipe(
        map(DictionaryValueUtil.deserializeDictionaryValue),
        catchError(ResponseUtil.handleError)
      );
  }

  /**
   * Update a {@link DictionaryValue} in a given dictionary.
   *
   * @param meaning
   *    The dictionary to update the value to.
   * @param dictionaryValue
   *    The updated value (which one to update is determined by ID).
   *
   * @returns An {@link Observable} that returns the updated {@link DictionaryValue}, null if not added.
   */
  public updateDictionaryValue(meaning: string, dictionaryValue: DictionaryValue): Observable<DictionaryValue> {
    const url = `${this._SERVICE_URL}/${meaning}/values/${dictionaryValue.dictionaryValueId}`;

    return this._httpClient.put<DictionaryValue>(url, DictionaryValueUtil.serializeDictionaryValue(dictionaryValue))
      .pipe(
        map(DictionaryValueUtil.deserializeDictionaryValue),
        catchError(ResponseUtil.handleError)
      );
  }

  /**
   * Delete a {@link DictionaryValue} from a given dictionary.
   *
   * @param meaning
   *    The dictionary to delete the value from.
   * @param dictionaryValue
   *    The value to delete.
   *
   * @returns An {@link Observable} that returns whether or not the delete was successful.
   */
  public deleteDictionaryValue(meaning: string, dictionaryValue: DictionaryValue): Observable<boolean> {
    const url = `${this._SERVICE_URL}/${meaning}/values/${dictionaryValue.dictionaryValueId}`;

    return this._httpClient.delete<boolean>(url, {observe: 'response'})
      .pipe(
        map(response => response.status === 204),
        catchError(ResponseUtil.handleError)
      );
  }
}
