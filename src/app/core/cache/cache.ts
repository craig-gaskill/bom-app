import {Subject, Observable, of, throwError} from 'rxjs';

import {ObjectUtil} from '../utilities/object.util';

interface CacheContent {
  expiry: number;
  value: any;
}

/**
 * An observable base in-memory cache implementation that keeps track of
 * in-flight observables and sets a default expiry for cached values.
 *
 * These are intended to be short-lived caches (< 5 minutes) to simply
 * reduce the number of calls to the back-end for frequently accessed
 * resources (e.g. getUserById, getInsuranceById, getStaffById, etc.).
 */
export class Cache {
  private readonly _DEFAULT_MAX_AGE: number = 5 * 60 * 1000;  // 5 minutes * 60 (seconds per minute) * 1000 (milliseconds per second)
  private readonly _CACHE: Map<string, CacheContent> = new Map<string, CacheContent>();
  private readonly _IN_FLIGHT: Map<string, Subject<any>> = new Map<string, Subject<any>>();

  private readonly _CACHE_NAME: string;
  private readonly _MAX_AGE: number;

  constructor(name: string, maxAge?: number) {
    this._CACHE_NAME = name;
    this._MAX_AGE    = ObjectUtil.isDefined(maxAge) ? maxAge : this._DEFAULT_MAX_AGE;
  }

  /**
   * Get the value from the cache if the key is provided.
   * If no value exists in cache, then check if the same call exists in flight.
   * If so, return the in-flight subject.
   * If not, create a new in-flight subject and return the source observable.
   */
  public get(key: string, fallback?: Observable<any>,  maxAge: number = this._MAX_AGE): Observable<any> {
    if (this.has(key)) {
      return of(this._CACHE.get(key).value);
    }

    if (this._IN_FLIGHT.has(key)) {
      return this._IN_FLIGHT.get(key).asObservable();
    } else if (fallback && fallback instanceof Observable) {
      const newObservable = new Subject();
      this._IN_FLIGHT.set(key, newObservable);

      fallback.subscribe(result => this.set(key, result, maxAge));

      return newObservable.asObservable();
    } else {
      return throwError('Requested key is not available in Cache');
    }
  }

  /**
   * Sets the value with the key into the cache.
   * Notifies all observers of the new value.
   */
  public set(key: string, value: any, maxAge: number = this._MAX_AGE): void {
    this._CACHE.set(key, { value, expiry: Date.now() + maxAge });
    this.notifyInFlightObservers(key, value);
  }

  /**
   * Checks if the cache contains a value for the specified key and ensures the time associated with the value hasn't expired.
   */
  public has(key: string): boolean {
    if (this._CACHE.has(key)) {
      if (this._CACHE.get(key).expiry < Date.now()) {
        this._CACHE.delete(key);
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  /**
   * Deletes the value associated with the key from the cache.
   */
  public delete(key: string): boolean {
    if (this._CACHE.has(key)) {
      return this._CACHE.delete(key);
    } else {
      return false;
    }
  }

  /**
   * Deletes any value with a key that starts with the specified key from the cache.
   * @param keyStartsWith Key to match on.
   */
  public deleteStartsWith(keyStartsWith: string): boolean {
    let foundEntriesToDelete = false;
    this._CACHE.forEach((value, key, map) => {
      if (key.startsWith(keyStartsWith)) {
        map.delete(key);
        foundEntriesToDelete = true;
      }
    });

    return foundEntriesToDelete;
  }

  /**
   * Clears all data from the cache.
   */
  public clear(): void {
    this._CACHE.clear();
  }

  /**
   * Publishes the value to all observers of the given in progress observables if observers exist.
   */
  private notifyInFlightObservers(key: string, value: any): void {
    if (this._IN_FLIGHT.has(key)) {
      const inFlight = this._IN_FLIGHT.get(key);
      const observersCount = inFlight.observers.length;
      if (observersCount) {
        inFlight.next(value);
      }

      inFlight.complete();
      this._IN_FLIGHT.delete(key);
    }
  }
}
