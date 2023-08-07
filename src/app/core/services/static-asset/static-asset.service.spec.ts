import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { StaticAssetService } from './static-asset.service';
import { environment } from 'environments/environment';
import { FileWithUrl } from 'core/classes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from 'core/interceptors/url/url.interceptor';

describe('StaticAssetService', () => {
  let service: StaticAssetService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
      ],
    });

    service = TestBed.inject(StaticAssetService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchAsset() method', () => {
    it("should send a GET request to server's public folder", () => {
      const relativeUrl = '/images/some-image.png';
      const fullUrl = environment.STATIC_ASSETS_BASE_URL + relativeUrl;

      service.fetchAsset(relativeUrl).subscribe((result) => {
        expect(result instanceof FileWithUrl).toBe(true);
        expect(result.url).toBe(relativeUrl);
      });

      const req = httpTestingController.expectOne(fullUrl);

      req.flush(null);
      httpTestingController.verify();
    });
  });
});