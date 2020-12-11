import {Directive, ElementRef, Input, OnDestroy} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {MatSpinner} from '@angular/material/progress-spinner';

@Directive({
  selector: '[processingSpinner]'
})
export class ProcessingSpinnerDirective implements OnDestroy {
  private _showSpinner = false;
  private _spinnerRef: OverlayRef = this._createSpinnerOverlay();

  @Input()
  public get showSpinner(): boolean {
    return this._showSpinner;
  }

  public set showSpinner(val: boolean) {
    this._showSpinner = val;
    this._showSpinner ? this._startSpinner() : this._stopSpinner();
  }

  constructor(private _elementRef: ElementRef, private _overlay: Overlay) { }

  public ngOnDestroy(): void {
    this._stopSpinner();
  }

  private _createSpinnerOverlay(): OverlayRef {
    return this._overlay.create({
      hasBackdrop: true,
      positionStrategy: this._overlay.position()
        .flexibleConnectedTo(this._elementRef)
        .withPositions([{
          originX: 'center',
          originY: 'center',
          overlayX: 'center',
          overlayY: 'center'
        }])
    });
  }

  private _startSpinner(): void {
    this._spinnerRef.attach(new ComponentPortal(MatSpinner));
  }

  private _stopSpinner(): void {
    this._spinnerRef.detach();
  }
}
