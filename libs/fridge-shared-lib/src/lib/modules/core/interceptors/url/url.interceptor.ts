import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  public constructor(@Inject('ENV') private environment: any) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const urlPrefix = request.url.includes('/images/')
      ? this.environment.STATIC_ASSETS_BASE_URL
      : this.environment.API_BASE_URL;

    const enhancedRequest = request.clone({
      url: urlPrefix + request.url,
    });

    return next.handle(enhancedRequest);
  }
}
