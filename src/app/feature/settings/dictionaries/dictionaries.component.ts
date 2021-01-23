import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Dictionary} from '../../../core/dictionary/dictionary.model';
import {DictionariesManager} from './dictionaries.manager';
import {ViewStatus} from '../../../app-store.state';

@Component({
  selector: 'bom-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionariesComponent implements OnInit, OnDestroy {
  public dictionaries$: Observable<Dictionary[]>;
  public viewStatus$: Observable<ViewStatus>;
  public expandedMeaning: string;

  constructor(private _dictionariesManager: DictionariesManager) { }

  public ngOnInit(): void {
    this.dictionaries$ = this._dictionariesManager.selectAllDictionaries();
    this.viewStatus$   = this._dictionariesManager.getViewStatus();

    this._dictionariesManager.loadAllDictionaries();
  }

  public ngOnDestroy(): void {
    this._dictionariesManager.resetDictionaries();
  }

  public onExpandDictionary(meaning: string): void {
    this.expandedMeaning = meaning;
  }

  public onAddDictionaryValue(dictionaryMeaning: string): void {
    this._dictionariesManager.addDictionaryValue(dictionaryMeaning);
  }
}
