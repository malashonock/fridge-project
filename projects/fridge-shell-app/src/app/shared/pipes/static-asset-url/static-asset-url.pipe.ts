import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '@shell/environments/environment';

@Pipe({
  name: 'staticAssetUrl',
})
export class StaticAssetUrlPipe implements PipeTransform {
  public transform(url: string | null | undefined): string | null {
    return url ? environment.STATIC_ASSETS_BASE_URL + url : null;
  }
}
