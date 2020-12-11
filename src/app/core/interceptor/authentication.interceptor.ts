import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem("at");
    if (token) {
      if (!request.headers.has("Authorization")) {
        const bearerToken = `Bearer ${token}`;
        const authReq = request.clone({headers: request.headers.set("Authorization", bearerToken)});

        return next.handle(authReq);
      }
    }

    return next.handle(request);
  }
}
