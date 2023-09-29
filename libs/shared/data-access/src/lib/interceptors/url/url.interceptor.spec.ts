import { TestBed } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { UrlInterceptor } from './url.interceptor';

describe('UrlInterceptor', () => {
  const STATIC_ASSETS_BASE_URL = 'http://localhost:3000';
  const API_BASE_URL = 'http://localhost:3000/api';

  let urlInterceptor: UrlInterceptor;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: 'ENV', useValue: { STATIC_ASSETS_BASE_URL, API_BASE_URL } },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UrlInterceptor,
          multi: true,
        },
      ],
    });

    urlInterceptor = TestBed.inject(HTTP_INTERCEPTORS)[0] as UrlInterceptor;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(urlInterceptor).toBeTruthy();
  });

  it('given a path like /images/*, should append bare server url', () => {
    const relativeUrl = '/images/some-image.png';
    const fullUrl = STATIC_ASSETS_BASE_URL + relativeUrl;

    httpClient.get(relativeUrl).subscribe();

    const req = httpTestingController.expectOne(fullUrl);

    req.flush(null);
    httpTestingController.verify();
  });

  it('given other paths, should append server API url', () => {
    const relativeUrl = '/auth';
    const fullUrl = API_BASE_URL + relativeUrl;

    httpClient.get(relativeUrl).subscribe();

    const req = httpTestingController.expectOne(fullUrl);

    req.flush(null);
    httpTestingController.verify();
  });
});
