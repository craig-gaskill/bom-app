import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TimeZoneInterceptor implements HttpInterceptor {
  private readonly HEADER_TIME_ZONE = 'X-Time-Zone';
  private readonly TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

  constructor() {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.headers.has(this.HEADER_TIME_ZONE)) {
      const offsetRequest = request.clone({headers: request.headers.set(this.HEADER_TIME_ZONE, this.TIME_ZONE)});
      return  next.handle(offsetRequest);
    } else {
      return next.handle(request);
    }
  }
}
