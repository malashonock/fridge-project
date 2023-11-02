import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { FileWithUrl } from 'shared-util-forms';

@Injectable({
  providedIn: 'root',
})
export class StaticAssetService {
  public constructor(
    private httpClient: HttpClient,
    @Inject('ENV') private environment: { STATIC_ASSETS_BASE_URL: string }
  ) {}

  public fetchAsset(url: string): Observable<FileWithUrl> {
    return this.httpClient
      .get<File>(url, { responseType: 'blob' as 'json' })
      .pipe(
        map((file: File): FileWithUrl => {
          const urlPrefix = this.environment.STATIC_ASSETS_BASE_URL;
          return new FileWithUrl(file, urlPrefix + url);
        })
      );
  }
}
