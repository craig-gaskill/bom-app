import {MatFormFieldAppearance} from '@angular/material/form-field';
import {FloatLabelType} from '@angular/material/form-field/form-field';

import {NameFormat} from './name-format.enum';

/**
 * Defines how the system should appear to the user.
 *
 * @author Craig Gaskill
 */
export interface Configuration {
  /**
   * The {NameFormat} to use when formatting a Person's name.
   */
  nameFormat: NameFormat;

  /**
   * The format to use when formatting a date-only field.
   */
  dateFormat: string;

  /**
   * The format to use when formatting a time-only field.
   */
  timeFormat: string;

  /**
   * The format to use when formatting a date and time field.
   */
  dateTimeFormat: string;

  /**
   * The appearance for the material components.
   */
  componentAppearance: MatFormFieldAppearance;

  /**
   * The way a label should float (or not) on a component.
   */
  floatLabel: FloatLabelType;
}
