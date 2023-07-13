import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

type ChangeEventHandler = (value: string | null) => void;
type BlurEventHandler = () => void;

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() name = '';
  @Input() label = '';
  @Input() error: string | null = null;

  @ViewChild(FormControlDirective, { static: true })
  formControlDirective!: FormControlDirective;

  constructor(private formGroupDirective: FormGroupDirective) {}

  get formControl(): FormControl {
    return (
      (this.formGroupDirective.control?.get(this.name) as FormControl) ??
      new FormControl('')
    );
  }

  writeValue(value: string): void {
    this.formControlDirective.valueAccessor?.writeValue(value);
  }

  registerOnChange(changeEventHandler: ChangeEventHandler): void {
    this.formControlDirective.valueAccessor?.registerOnChange(
      changeEventHandler
    );
  }

  registerOnTouched(blurEventHandler: BlurEventHandler): void {
    this.formControlDirective.valueAccessor?.registerOnTouched(
      blurEventHandler
    );
  }

  setDisabledState(isDisabled: boolean): void {
    this.formControlDirective.valueAccessor?.setDisabledState?.(isDisabled);
  }
}
