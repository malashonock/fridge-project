import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  DefaultValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

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

  @ViewChild('input') textInput!: DefaultValueAccessor;

  writeValue(value: string): void {
    this.textInput.writeValue(value);
  }

  registerOnChange(fn: any): void {
    this.textInput.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.textInput.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.textInput.setDisabledState(isDisabled);
  }
}
