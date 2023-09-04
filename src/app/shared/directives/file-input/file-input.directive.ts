/* eslint-disable @angular-eslint/directive-selector */

import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { FileWithUrl } from 'core/classes/file-with-url/file-with-url.class';
import {
  ChangeEventHandler,
  ngValueAccessorProvider,
} from 'utils/form/form.utils';

@Directive({
  selector: 'input[type="file"]',
  providers: [ngValueAccessorProvider(FileInputDirective)],
})
export class FileInputDirective implements ControlValueAccessor {
  private touched = false;
  private touch(): void {
    if (!this.touched) {
      this.touched = true;
      this.notifyTouchedListener?.();
    }
  }

  private notifyChangeListener: ChangeEventHandler<FileWithUrl | null> | null =
    null;
  private notifyTouchedListener: VoidFunction | null = null;

  @HostListener('change', ['$event.target.files[0]']) private onChange(
    file?: File
  ): void {
    if (file) {
      this.notifyChangeListener?.(new FileWithUrl(file));
      this.touch();
    }
  }

  public constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  public writeValue(value: FileWithUrl | null): void {
    const dataTransfer = new DataTransfer();

    if (value) {
      dataTransfer.items.add(value);
    }

    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'files',
      dataTransfer.files
    );
  }

  public registerOnChange(
    onChangeCallback: ChangeEventHandler<FileWithUrl | null>
  ): void {
    this.notifyChangeListener = onChangeCallback;
  }

  public registerOnTouched(onTouchedCallback: VoidFunction): void {
    this.notifyTouchedListener = onTouchedCallback;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }
}
