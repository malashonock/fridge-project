import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { FileWithUrl } from 'core/classes';

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
          return new FileWithUrl(file, url);
        })
      );
  }
}
