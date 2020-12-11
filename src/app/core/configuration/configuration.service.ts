import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

import {NameFormat} from "./name-format.enum";
import {Configuration} from "./configuration.model";
import {ObjectUtil} from "../utilities/object.util";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService implements OnDestroy {
  private readonly DEFAULT_NAME_FORMAT          = NameFormat.MediumLastFirst;
  private readonly DEFAULT_DATE_FORMAT          = "mediumDate";
  private readonly DEFAULT_TIME_FORMAT          = "shortTime";
  private readonly DEFAULT_DATE_TIME_FORMAT     = "medium";
  private readonly DEFAULT_COMPONENT_APPEARANCE = "outline";
  private readonly DEFAULT_FLOAT_LABEL          = "always";

  private readonly DEFAULT_CONFIG: Configuration = {
    nameFormat: this.DEFAULT_NAME_FORMAT,
    dateFormat: this.DEFAULT_DATE_FORMAT,
    timeFormat: this.DEFAULT_TIME_FORMAT,
    dateTimeFormat: this.DEFAULT_DATE_TIME_FORMAT,
    componentAppearance: this.DEFAULT_COMPONENT_APPEARANCE,
    floatLabel: this.DEFAULT_FLOAT_LABEL
  };

  private readonly _subject: BehaviorSubject<Configuration>;

  private _config: Configuration = this.DEFAULT_CONFIG;

  constructor() {
    this._subject = new BehaviorSubject<Configuration>(this._config);
  }

  public ngOnDestroy(): void {
    this._subject.complete();
  }

  /**
   * Retrieves the current configuration for the application.
   */
  public getConfiguration$(): Observable<Configuration> {
    return this._subject.asObservable();
  }

  /**
   * Sets the configuration to use. If 'undefined' or 'null' then it will reset back to the default configuration.
   *
   * @param config
   *    The {CgtConfiguration} to use.
   */
  public setConfiguration(config: Configuration) {
    this._config = ObjectUtil.valueOrElse(config, this.DEFAULT_CONFIG);
    this._subject.next(this._config);
  }

  /**
   * Changes the name format to the specified format. If 'undefined' or 'null' then it
   * will reset it back to the default of 'MediumLastFirst'.
   *
   * @param nameFormat
   *    The {CgtNameFormat} to use for names.
   */
  public changeNameFormat(nameFormat: NameFormat): void {
    this._config = {
      nameFormat: ObjectUtil.valueOrElse(nameFormat, this.DEFAULT_NAME_FORMAT),
      dateFormat: this._config.dateFormat,
      timeFormat: this._config.timeFormat,
      dateTimeFormat: this._config.dateTimeFormat,
      componentAppearance: this._config.componentAppearance,
      floatLabel: this._config.floatLabel
    };

    this._subject.next(this._config);
  }

  /**
   * Changes the date format to the specified format. If 'undefined' or 'null' then it
   * will reset it back to the default of 'mediumDate'.
   *
   * @param dateFormat
   *    The new format to use for dates.
   */
  public changeDateFormat(dateFormat: string): void {
    this._config = {
      nameFormat: this._config.nameFormat,
      dateFormat:ObjectUtil.valueOrElse(dateFormat, this.DEFAULT_DATE_FORMAT),
      timeFormat: this._config.timeFormat,
      dateTimeFormat: this._config.dateTimeFormat,
      componentAppearance: this._config.componentAppearance,
      floatLabel: this._config.floatLabel
    };

    this._subject.next(this._config);
  }

  /**
   * Changes the time format to the specified format. If 'undefined' or 'null' then it
   * will reset it back to the default of 'shortTime'.
   *
   * @param timeFormat
   *    The new format to use for times.
   */
  public changeTimeFormat(timeFormat: string): void {
    this._config = {
      nameFormat: this._config.nameFormat,
      dateFormat: this._config.dateFormat,
      timeFormat: ObjectUtil.valueOrElse(timeFormat, this.DEFAULT_TIME_FORMAT),
      dateTimeFormat: this._config.dateTimeFormat,
      componentAppearance: this._config.componentAppearance,
      floatLabel: this._config.floatLabel
    };

    this._subject.next(this._config);
  }

  /**
   * Changes the date/time format to the specified format. If 'undefined' or 'null' then it
   * will reset it back to the default of 'medium'.
   *
   * @param dateTimeFormat
   *    The new format to use for date/times.
   */
  public changeDateTimeFormat(dateTimeFormat: string): void {
    this._config = {
      nameFormat: this._config.nameFormat,
      dateFormat: this._config.dateFormat,
      timeFormat: this._config.timeFormat,
      dateTimeFormat: ObjectUtil.valueOrElse(dateTimeFormat, this.DEFAULT_DATE_TIME_FORMAT),
      componentAppearance: this._config.componentAppearance,
      floatLabel: this._config.floatLabel
    };

    this._subject.next(this._config);
  }

  /**
   * Changes the component appearance to the specified format. If 'undefined' or 'null' then it
   * will reset it back to the default of 'outline'.
   *
   * @param componentAppearance
   *    The component appearance to use for material components.
   */
  public changeComponentAppearance(componentAppearance: string): void {
    this._config = {
      nameFormat: this._config.nameFormat,
      dateFormat: this._config.dateFormat,
      timeFormat: this._config.timeFormat,
      dateTimeFormat: this._config.dateTimeFormat,
      componentAppearance: ObjectUtil.valueOrElse(componentAppearance, this.DEFAULT_COMPONENT_APPEARANCE),
      floatLabel: this._config.floatLabel
    };

    this._subject.next(this._config);
  }

  /**
   * Changes the float of the label to the specified format. If 'undefined' or 'null' then it
   * will reset it back to the default of 'always'.
   *
   * @param floatLabel
   *    The float of the label to use for material components.
   */
  public changeFloatLabel(floatLabel: string): void {
    this._config = {
      nameFormat: this._config.nameFormat,
      dateFormat: this._config.dateFormat,
      timeFormat: this._config.timeFormat,
      dateTimeFormat: this._config.dateTimeFormat,
      componentAppearance: this._config.componentAppearance,
      floatLabel: ObjectUtil.valueOrElse(floatLabel, this.DEFAULT_FLOAT_LABEL)
    };

    this._subject.next(this._config);
  }
}
