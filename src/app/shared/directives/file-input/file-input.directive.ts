/* eslint-disable @angular-eslint/directive-selector */

import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FileWithUrl } from 'core/classes';

type VoidEventHandler = () => void;
type ChangeEventHandler = (file: FileWithUrl | null) => void;

@Directive({
  selector: 'input[type="file"]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputDirective),
      multi: true,
    },
  ],
})
export class FileInputDirective implements ControlValueAccessor {
  private touched = false;
  private touch(): void {
    if (!this.touched) {
      this.touched = true;
      this.notifyTouchedListener?.();
    }
  }

  private notifyChangeListener: ChangeEventHandler | null = null;
  private notifyTouchedListener: VoidEventHandler | null = null;

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

  public registerOnChange(onChangeCallback: ChangeEventHandler): void {
    this.notifyChangeListener = onChangeCallback;
  }

  public registerOnTouched(onTouchedCallback: VoidEventHandler): void {
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
