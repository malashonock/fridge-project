import { Inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'staticAssetUrl',
  standalone: true,
})
export class StaticAssetUrlPipe implements PipeTransform {
  public constructor(@Inject('ENV') private environment: any) {}

  public transform(url: string | null | undefined): string | null {
    return url ? this.environment.STATIC_ASSETS_BASE_URL + url : null;
  }
}
