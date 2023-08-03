import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

import { FileWithUrl } from 'core/classes';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploaderComponent {
  @Input() public name = '';

  public image: FileWithUrl | null = null;

  @ViewChild('nativeInput') public nativeInput?: ElementRef;

  public openFileDialog(): void {
    this.nativeInput?.nativeElement.click();
  }

  public onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement | null)?.files?.[0];
    if (file) {
      this.image = new FileWithUrl([file], file.name);
    }
  }

  public onDiscardFile(): void {
    this.image = null;

    if (this.nativeInput) {
      const dataTransfer = new DataTransfer();
      this.nativeInput.nativeElement.files = dataTransfer.files;
    }
  }
}
