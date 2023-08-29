import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { FileWithUrl } from 'core/classes/file-with-url/file-with-url.class';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StaticAssetService {
  public constructor(private httpClient: HttpClient) {}

  public fetchAsset(url: string): Observable<FileWithUrl> {
    return this.httpClient
      .get<File>(url, { responseType: 'blob' as 'json' })
      .pipe(
        map((file: File): FileWithUrl => {
          const clientUploaded = url.startsWith('blob:');

          const urlPrefix = clientUploaded
            ? ''
            : environment.STATIC_ASSETS_BASE_URL;

          return new FileWithUrl(file, urlPrefix + url);
        })
      );
  }
}
