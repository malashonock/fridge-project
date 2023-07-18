import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, first, mergeMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectAuthToken } from 'app/state/auth/auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.select(selectAuthToken).pipe(
      first(),
      mergeMap((authToken: string | undefined) => {
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
