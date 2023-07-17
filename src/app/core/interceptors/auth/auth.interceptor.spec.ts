import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const testUrl = 'http://example.com';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setup = (initialState: any) => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        provideMockStore({
          initialState,
        }),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  };

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('given auth token is not available', () => {
    beforeEach(() => {
      setup({
        auth: undefined,
      });
    });

    it('should NOT append Authorization header', () => {
      httpClient.get(testUrl).subscribe();

      const req = httpTestingController.expectOne(
        (request) => !request.headers.has('Authorization')
      );

      req.flush(null);
    });
  });

  describe('given auth token is available', () => {
    const token = 'AaBbCcDd12345';

    beforeEach(() => {
      setup({
        auth: {
          token,
        },
      });
    });

    it('should append Authorization header', () => {
      httpClient.get(testUrl).subscribe();

      const req = httpTestingController.expectOne(
        (request) => request.headers.get('Authorization') === `Bearer ${token}`
      );

      req.flush(null);
    });
  });
});
