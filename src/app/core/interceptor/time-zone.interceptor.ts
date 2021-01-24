import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class TimeZoneInterceptor implements HttpInterceptor {
  private readonly HEADER_TIME_ZONE = 'X-Time-Zone';
  private readonly TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

  constructor() {}

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!req.headers.has(this.HEADER_TIME_ZONE)) {
      const offsetRequest = req.clone({headers: req.headers.set(this.HEADER_TIME_ZONE, this.TIME_ZONE)});
      return next.handle(offsetRequest);
    } else {
      return next.handle(req);
    }
  }
}
