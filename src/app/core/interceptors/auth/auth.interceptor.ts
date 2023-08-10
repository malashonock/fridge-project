import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, exhaustMap, first } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectAuthToken } from 'app/state/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(private store: Store) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.select(selectAuthToken).pipe(
      first(),
      exhaustMap((authToken: string | undefined) => {
        const authRequest = authToken
          ? request.clone({
              setHeaders: {
                Authorization: `Bearer ${authToken}`,
              },
            })
          : request;
        return next.handle(authRequest);
      })
    );
  }
}
