import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { FileWithUrl } from '@shared/modules/file-upload/classes/file-with-url/file-with-url.class';
import { CoreModule } from '@shared/modules/core/core.module';

@Injectable({
  providedIn: CoreModule,
})
export class StaticAssetService {
  public constructor(
    private httpClient: HttpClient,
    @Inject('ENV') private environment: any
  ) {}

  public fetchAsset(url: string): Observable<FileWithUrl> {
    return this.httpClient
      .get<File>(url, { responseType: 'blob' as 'json' })
      .pipe(
        map((file: File): FileWithUrl => {
          const clientUploaded = url.startsWith('blob:');

          const urlPrefix = clientUploaded
            ? ''
            : this.environment.STATIC_ASSETS_BASE_URL;

          return new FileWithUrl(file, urlPrefix + url);
        })
      );
  }
}
