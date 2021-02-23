import {Component, OnInit} from '@angular/core';

import {Idle} from '@ng-idle/core';
import {formatDuration} from 'date-fns';

@Component({
  selector: 'bom-inactive-dialog',
  templateUrl: './inactive-dialog.component.html',
  styleUrls: ['./inactive-dialog.component.scss']
})
export class InactiveDialogComponent implements OnInit {
  public message: string;

  constructor(private _idle: Idle) { }

  public ngOnInit(): void {
    this._idle.onTimeoutWarning.subscribe((countdown) => {
      const minutes = Math.floor(countdown / 60);
      const seconds = countdown % 60;

      this.message = `You will be timed out in ${formatDuration({minutes, seconds})}!`;
    });
  }
}
