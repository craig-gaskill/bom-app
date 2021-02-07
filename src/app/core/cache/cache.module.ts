import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CacheManager} from './cache.manager';

@NgModule({})
export class CacheRootModule {
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CacheModule {
  /**
   * For use in the root @NgModule decorator. Creates a module that provides a singleton service.
   */
  public static forRoot(): ModuleWithProviders<CacheRootModule> {
    return {
      ngModule: CacheRootModule,
      providers: [
        CacheManager
      ]
    };
  }
}
