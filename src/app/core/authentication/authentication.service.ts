import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {User} from '../user/user.model';
import {environment} from '../../../environments/environment';
import {HeaderUtil} from '../utilities/header.util';
import {ResponseUtil} from '../utilities/response.util';
import {UserService} from '../user/user.service';
import {AuthenticationUtil} from './authentication.util';
import {RegisterRequest} from './register-request.model';
import {ObjectUtil} from '../utilities/object.util';

export interface LoginResponse {
  access: string;
  status: string;
}

export enum LoginStatus {
  AccountDisabled = 'ACCOUNT_DISABLED',
  AccountLocked = 'ACCOUNT_LOCKED',
  AccountExpired = 'ACCOUNT_EXPIRED',
  PasswordExpired = 'PASSWORD_EXPIRED',
  PasswordTemporary = 'PASSWORD_TEMPORARY',
  Invalid = 'INVALID',
  Valid = 'VALID'
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly _authenticatedUser$: ReplaySubject<User> = new ReplaySubject<User>(1);
  private readonly _authenticatedStatus$: ReplaySubject<LoginStatus> = new ReplaySubject<LoginStatus>(1);

  private readonly _SERVICE_URL: string = environment.bomServiceUrl + '/auth';
  private readonly _ACCESS_TOKEN: string = 'at';
  private readonly _LOGIN_STATUS: string = 'ls';

  constructor(private _httpClient: HttpClient, private _userService: UserService) {
    const accessToken = sessionStorage.getItem(this._ACCESS_TOKEN);
    if (accessToken) {
      this._loadUser(accessToken);
    } else {
      this._authenticatedUser$.next(undefined);
    }

    const loginStatus = sessionStorage.getItem(this._LOGIN_STATUS);
    if (loginStatus) {
      this._setStatus(loginStatus);
    } else {
      this._authenticatedStatus$.next(undefined);
    }
  }

  public authenticatedUser$(): Observable<User> {
    return this._authenticatedUser$.asObservable();
  }

  public authenticatedStatus$(): Observable<LoginStatus> {
    return this._authenticatedStatus$.asObservable();
  }

  /**
   * Attempt to log a user into the system.
   *
   * @param username
   *    The username of the User logging in.
   * @param password
   *    The password of the User logging in.
   * @param source
   *    Represents the source of the change.
   */
  public login(username: string, password: string, source: string): Observable<LoginStatus> {
    const sourceHeader = new HttpHeaders()
      .set(HeaderUtil.HEADER_SOURCE, source);

    const body = Object.assign({
      username,
      password
    });

    return this._httpClient.post<LoginResponse>(`${this._SERVICE_URL}/login`, body, {headers: sourceHeader})
      .pipe(
        map(response => this._processResponse(response)),
        catchError(ResponseUtil.handleError)
      );
  }

  /**
   * Clears the session information to log the user out of the system.
   */
  public logout(): void {
    sessionStorage.removeItem(this._ACCESS_TOKEN);
    sessionStorage.removeItem(this._LOGIN_STATUS);

    this._authenticatedUser$.next(undefined);
    this._authenticatedStatus$.next(undefined);
  }

  /**
   * Checks to see if a user exists for the given email.
   *
   * @param email
   *    The email address to check.
   */
  public checkForEmail(email: string): Observable<boolean> {
    return this._httpClient.head<void>(`${this._SERVICE_URL}/register/${email}`, {observe: 'response'})
      .pipe(
        map(response => response.status === 200)
      );
  }

  /**
   * Attempt to register a new Tenant and User with the system.
   *
   * @param registerRequest
   *    The {RegisterRequest} that contains the information needed to register a new Tenant and User with the system.
   */
  public register(registerRequest: RegisterRequest, source: string): Observable<LoginStatus> {
    const sourceHeader = new HttpHeaders()
      .set(HeaderUtil.HEADER_SOURCE, source);

    return this._httpClient.post<LoginResponse>(`${this._SERVICE_URL}/register`, registerRequest, {headers: sourceHeader})
      .pipe(
        map(response => this._processResponse(response)),
        catchError(ResponseUtil.handleError)
      );
  }

  private _processResponse(response: LoginResponse): LoginStatus {
    if (!response) {
      return LoginStatus.Invalid;
    }

    this._loadUser(response.access);
    return this._setStatus(response.status);
  }

  private _setStatus(status: string): LoginStatus {
    let loginStatus;
    switch (status) {
      case LoginStatus.AccountDisabled:
        loginStatus = LoginStatus.AccountDisabled;
        break;

      case LoginStatus.AccountLocked:
        loginStatus = LoginStatus.AccountLocked;
        break;

      case LoginStatus.AccountExpired:
        loginStatus = LoginStatus.AccountExpired;
        break;

      case LoginStatus.PasswordExpired:
        loginStatus = LoginStatus.PasswordExpired;
        break;

      case LoginStatus.PasswordTemporary:
        loginStatus = LoginStatus.PasswordTemporary;
        break;

      case LoginStatus.Valid:
        loginStatus = LoginStatus.Valid;
        break;

      default:
        loginStatus = LoginStatus.Invalid;
    }

    this._authenticatedStatus$.next(loginStatus);
    sessionStorage.setItem(this._LOGIN_STATUS, loginStatus);

    return loginStatus;
  }

  private _loadUser(token: string): void {
    if (ObjectUtil.isUndefined(token)) {
      return;
    }

    sessionStorage.setItem(this._ACCESS_TOKEN, token);

    const userId = AuthenticationUtil.decodeUserId(token);
    if (ObjectUtil.isUndefined(userId)) {
      return;
    }

    this._userService.getUserById(userId)
      .pipe(
        catchError(ResponseUtil.handleError)
      )
      .subscribe(usr => {
        if (usr) {
          this._authenticatedUser$.next(usr);
        }
      });
  }
}
