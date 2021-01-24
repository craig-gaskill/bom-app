import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

import {environment} from '../../../environments/environment';

@Injectable()
export class SimulateThrottlingInterceptor implements HttpInterceptor {
  private readonly production = environment.production;

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        delay(this.production ? 0 : 1000)
      );
  }
}
