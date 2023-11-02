import { Component, HostBinding, HostListener } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'img[libImgSkeleton]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./img-skeleton.component.scss'],
  standalone: true,
})
export class ImgSkeletonComponent {
  @HostBinding('class.loading')
  private loading = true;

  @HostBinding('class.load-error')
  private error = false;

  @HostListener('load')
  private onLoadSuccess(): void {
    this.loading = false;
    this.error = false;
  }

  @HostListener('error')
  private onLoadError(): void {
    this.loading = false;
    this.error = true;
  }
}
