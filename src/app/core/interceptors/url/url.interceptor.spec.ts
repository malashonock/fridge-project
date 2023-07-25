import { TestBed } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { UrlInterceptor } from './url.interceptor';

import { environment } from 'environments/environment';

describe('UrlInterceptor', () => {
  let urlInterceptor: UrlInterceptor;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
      ],
    });

    urlInterceptor = TestBed.inject(HTTP_INTERCEPTORS)[0];
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(urlInterceptor).toBeTruthy();
  });

  it('should intercept HTTP requests', () => {
    const relativeUrl = '/auth';
    const fullUrl = environment.API_BASE_URL + relativeUrl;

    httpClient.get(relativeUrl).subscribe();

    const req = httpTestingController.expectOne(fullUrl);

    req.flush(null);
    httpTestingController.verify();
  });
});
