import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const urlPrefix = request.url.includes('/images/')
      ? environment.STATIC_ASSETS_BASE_URL
      : environment.API_BASE_URL;

    const enhancedRequest = request.clone({
      url: urlPrefix + request.url,
    });

    return next.handle(enhancedRequest);
  }
}
