import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

import { FileWithUrl } from 'core/classes';
import { FileInputDirective } from 'shared/directives';
import { FileValidator } from 'core/validators';

type VoidEventHandler = () => void;
type ChangeEventHandler = (image: FileWithUrl | null) => void;

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => ImageUploaderComponent),
    },
  ],
})
export class ImageUploaderComponent
  implements
    ControlValueAccessor,
    MatFormFieldControl<FileWithUrl | null>,
    OnInit,
    AfterViewInit,
    OnDestroy
{
  public formControl = new FormControl<FileWithUrl | null>(null, [
    FileValidator.type('image/*'),
  ]);

  @Input() public id = '';

  private _placehoder = 'Select image';
  public get placeholder(): string {
    return this._placehoder;
  }
  @Input() public set placeholder(value: string) {
    this._placehoder = value;
    this.stateChanges.next();
  }

  public get value(): FileWithUrl | null {
    return this.formControl.value;
  }
  @Input() public set value(value: FileWithUrl | null) {
    this.formControl.setValue(value);
  }

  private _focused = false;
  public get focused(): boolean {
    return this._focused;
  }
  public set focused(value: boolean) {
    this._focused = value;
    if (value === false) {
      this.touch();
    }
  }

  public get empty(): boolean {
    return this.value === null;
  }

  public get shouldLabelFloat(): boolean {
    return true; // always float
  }

  private _required = false;
  public get required(): boolean {
    return this._required;
  }
  @Input() public set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  public get disabled(): boolean {
    return this.formControl.disabled;
  }
  @Input() public set disabled(value: BooleanInput) {
    this.setDisabledState(coerceBooleanProperty(value));
  }

  public get errorState(): boolean {
    return this.formControl.touched && this.formControl.invalid;
  }

  @ViewChild('nativeInput') public nativeInput?: ElementRef;
  @ViewChild(FileInputDirective)
  private fileInputDirective?: FileInputDirective;

  public stateChanges = new Subject<void>();
  private destroy$ = new Subject();

  public constructor(
    @Optional() @Self() public ngControl: NgControl,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public openFileDialog(): void {
    this.nativeInput?.nativeElement.click();
  }

  public onDiscardFile(): void {
    this.formControl.reset(null);
  }

  public writeValue(value: FileWithUrl | null): void {
    this.formControl.setValue(value);
  }

  public registerOnChange(onChangeCallback: ChangeEventHandler): void {
    this.formControl.valueChanges.subscribe(onChangeCallback);
  }

  private _onTouchedCallback: VoidEventHandler | null = null;
  public registerOnTouched(onTouchedCallback: VoidEventHandler): void {
    // FileInputDirective is not available unitl AfterViewInit,
    // so we need to save the callback temporarily
    this._onTouchedCallback = onTouchedCallback;
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  public touch(): void {
    if (!this.formControl.touched) {
      this.formControl.markAsTouched();
    }
  }

  public onFocusIn() {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  public onFocusOut(event: FocusEvent) {
    if (!this.elementRef.nativeElement.contains(event.relatedTarget)) {
      this.focused = false;
      this.stateChanges.next();
    }
  }

  public setDescribedByIds(ids: string[]): void {
    const containerEl =
      this.elementRef.nativeElement.querySelector('.image-container');
    this.renderer.setAttribute(containerEl, 'aria-describedby', ids.join(' '));
  }

  public onContainerClick(event: MouseEvent): void {
    // Do nothing
  }

  public ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.stateChanges.next();
      });

    this.formControl.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.stateChanges.next();
      });
  }

  public ngAfterViewInit(): void {
    if (this._onTouchedCallback) {
      this.fileInputDirective?.registerOnTouched(this._onTouchedCallback);
    }
  }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
