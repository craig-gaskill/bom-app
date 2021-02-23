import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Dictionary} from '../../../../core/dictionary/dictionary.model';
import {DictionaryValue} from '../../../../core/dictionary/value/dictionary-value.model';
import {DictionariesManager} from '../dictionaries.manager';
import {LoadStatus} from '../../../../app-store.state';

@Component({
  selector: 'bom-dictionary-detail',
  templateUrl: './dictionary-detail.component.html',
  styleUrls: ['./dictionary-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionaryDetailComponent implements OnInit, OnDestroy {
  public readonly LOAD_STATUSES = LoadStatus;

  private _subscribed = true;

  public dictionaryValues$: Observable<DictionaryValue[]>;
  public loadStatus$: Observable<LoadStatus>;

  @Input()
  public dictionary: Dictionary;

  constructor(private _dictionariesManager: DictionariesManager) { }

  public ngOnInit(): void {
    this.dictionaryValues$ = this._dictionariesManager.selectAllDictionaryValues(this.dictionary.meaning);
    this.loadStatus$ = this._dictionariesManager.loadAllDictionaryValues(this.dictionary.meaning);
  }

  public ngOnDestroy(): void {
    this._subscribed = false;
  }
}
