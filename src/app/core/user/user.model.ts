import {BaseModel} from '../base.model';

export interface User extends BaseModel {
  userId: number;
  username: string;
  temporaryPassword: boolean;
  accountLockedDateTime?: Date;
  accountLockType?: string;
  accountExpiredDateTime?: Date;
  passwordChangedDateTime?: Date;
  passwordExpiredDateTime?: Date;
  admin: boolean;
}
