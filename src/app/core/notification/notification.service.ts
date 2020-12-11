import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly _DEFAULT_DURATION = 2500;

  constructor(private _snackBar: MatSnackBar) { }

  public inform(message: string, actions?: string, durationInMilliseconds = this._DEFAULT_DURATION): void {
    this._snackBar.open(message, actions, {panelClass: 'notify-inform', duration: durationInMilliseconds});
  }

  public warn(message: string, actions?: string, durationInMilliseconds = this._DEFAULT_DURATION): void {
    this._snackBar.open(message, actions, {panelClass: 'notify-warn', duration: durationInMilliseconds});
  }

  public success(message: string, actions?: string, durationInMilliseconds = this._DEFAULT_DURATION): void {
    this._snackBar.open(message, actions, {panelClass: 'notify-success', duration: durationInMilliseconds});
  }

  public failure(message: string, actions?: string, durationInMilliseconds = this._DEFAULT_DURATION): void {
    this._snackBar.open(message, actions, {panelClass: 'notify-failure', duration: durationInMilliseconds});
  }
}
