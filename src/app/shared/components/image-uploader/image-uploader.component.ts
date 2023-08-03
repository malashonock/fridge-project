import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FileWithUrl } from 'core/classes';

type ChangeEventHandler = (image: FileWithUrl | null) => void;

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploaderComponent),
      multi: true,
    },
  ],
})
export class ImageUploaderComponent implements ControlValueAccessor {
  @Input() public name = '';

  private _image: FileWithUrl | null = null;

  public get image(): FileWithUrl | null {
    return this._image;
  }

  public set image(newImage: FileWithUrl | null) {
    this._image = newImage;
    this.onChange(newImage);

    if (this.nativeInput) {
      const dataTransfer = new DataTransfer();

      if (newImage) {
        dataTransfer.items.add(newImage);
      }

      this.nativeInput.nativeElement.files = dataTransfer.files;
    }
  }

  private onChange: ChangeEventHandler = () => undefined;

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
  }

  public writeValue(value: FileWithUrl | null): void {
    this.image = value;
  }

  public registerOnChange(changeEventHandler: ChangeEventHandler): void {
    this.onChange = changeEventHandler;
  }

  public registerOnTouched(): void {
    // Not used
  }
}
