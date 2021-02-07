import {Injectable} from '@angular/core';

import {Cache} from './cache';

/**
 * Provides the ability to create, retrieve, and delete a {Cache}.
 *
 * These are intended to be short-lived caches (< 5 minutes) to simply
 * reduce the number of calls to the back-end for frequently accessed
 * resources (e.g. getUserById, getInsuranceById, getStaffById, etc.).
 */
@Injectable()
export class CacheManager {
  private readonly _CACHES: Map<string, Cache> = new Map<string, Cache>();

  /**
   * Will create a new cache and return it for use.
   *
   * @param name
   *    The name of the cache to create.
   * @param maxAge
   *    The default age to keep items in the cache.
   *
   * @throws An {Error} if the cache already exists.
   */
  public createCache(name: string, maxAge?: number): Cache {
    if (this._CACHES.has(name)) {
      throw new Error(`The cache [${name}] already exists!`);
    }

    const cache = new Cache(name, maxAge);
    this._CACHES.set(name, cache);

    return cache;
  }

  /**
   * Will return the cache for the given name. If a cache doesn't exist for
   * the specified name and the create flag is set to 'true' then a cache will
   * be created with that name and returned
   *
   * @param name
   *    The name of the cache to retrieve.
   * @param create
   *    Indicates if the cache should be created if it doesn't already exist.
   * @param maxAge
   *    The default age to keep items in the cache.
   */
  public getCache(name: string, create = false, maxAge?: number): Cache {
    if (this._CACHES.has(name)) {
      return this._CACHES.get(name);
    } else if (create) {
      const cache = new Cache(name, maxAge);
      this._CACHES.set(name, cache);

      return cache;
    } else {
      return undefined;
    }
  }

  /**
   * Will delete an existing cache. If the cache doesn't exists, no error will be thrown.
   *
   * @param name
   *    The name of the cache to delete.
   */
  public deleteCache(name: string): void {
    if (this._CACHES.has(name)) {
      this._CACHES.delete(name);
    }
  }

  /**
   * Will clear / delete all existing caches.
   */
  public clearAll(): void {
    this._CACHES.forEach(cache => cache.clear());
  }
}
