import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {Dictionary, DictionaryUtil} from './dictionary.model';
import {ObjectUtil} from '../utilities/object.util';
import {ResponseUtil} from '../utilities/response.util';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private readonly _SERVICE_URL: string = environment.bomServiceUrl + '/dictionaries';

  constructor(private _httpClient: HttpClient) { }

  /**
   * Gets a list of Dictionaries.
   *
   * @param start
   *    The position in the collection to start retrieving Dictionaries from.
   * @param limit
   *    The maximum number of Dictionaries to retrieve.
   * @param searchText
   *    A {String} the defines addition search criteria to qualify Dictionaries on.
   * @param includeInactive
   *    Indicates if inactive records should also be returned.
   */
  public getDictionaries(start = 0, limit = 25, searchText?: string, includeInactive = false
  ): Observable<Dictionary[]> {
    let params = new HttpParams()
      .set('start', start.toString())
      .set('limit', limit.toString())
      .set('includeInactive', includeInactive.toString());

    if (ObjectUtil.isDefined(searchText)) {
      params = params.set('searchText', searchText);
    }

    return this._httpClient.get<Dictionary[]>(this._SERVICE_URL, {params})
      .pipe(
        map(DictionaryUtil.deserializeDictionaries),
        catchError(ResponseUtil.handleError)
      );
  }
}
