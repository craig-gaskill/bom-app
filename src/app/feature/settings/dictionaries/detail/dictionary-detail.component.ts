import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Dictionary} from '../../../../core/dictionary/dictionary.model';
import {DictionaryValue} from '../../../../core/dictionary/value/dictionary-value.model';
import {DictionariesManager} from '../dictionaries.manager';

@Component({
  selector: 'bom-dictionary-detail',
  templateUrl: './dictionary-detail.component.html',
  styleUrls: ['./dictionary-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DictionaryDetailComponent implements OnInit {
  public dictionaryValues$: Observable<DictionaryValue[]>;

  @Input()
  public dictionary: Dictionary;

  constructor(private _dictionariesManager: DictionariesManager) { }

  public ngOnInit(): void {
    this.dictionaryValues$ = this._dictionariesManager.selectAllDictionaryValues(this.dictionary.meaning);
    this._dictionariesManager.loadAllDictionaryValues(this.dictionary.meaning);
  }
}
