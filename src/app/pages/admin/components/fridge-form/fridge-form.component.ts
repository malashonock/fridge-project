import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControlStatus, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, combineLatest, map, startWith, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { Fridge } from 'core/models/fridge/fridge.interface';
// import { FridgeFields } from 'core/models/fridge/fridge-fields.interface';
import { NumberValidators } from 'core/validators/number/number.validators';
import { ComboErrorStateMatcher } from 'core/classes/combo-error-state-matcher/combo-error-state-matcher.class';
import { EarlyErrorStateMatcher } from 'core/classes/early-error-state-matcher/early-error-state-matcher.class';
import { FileWithUrl } from 'core/classes/file-with-url/file-with-url.class';
import { FridgesActions } from 'app/state/fridges/fridges.actions';
// import { selectFridgeSubmitting } from 'app/state/fridges/fridges.selectors';
import { controlHasError, getControlError } from 'utils/form/form.utils';
import { FormMode } from 'core/models/ui/form-mode.enum';

interface FridgeDialogData {
  fridge?: Fridge;
  image?: FileWithUrl | null;
}

@Component({
  selector: 'app-fridge-form',
  templateUrl: './fridge-form.component.html',
  styleUrls: ['./fridge-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FridgeFormComponent implements OnInit, OnDestroy {
  private fridge = this.data?.fridge;
  private fridgeImage = this.data?.image;

  public form = this.formBuilder.group({
    model: [this.fridge?.model, [Validators.required]],
    description: [this.fridge?.description, [Validators.maxLength(1000)]],
    geolocation: [this.fridge?.geolocation, [Validators.required]],
    address: this.formBuilder.group({
      country: [this.fridge?.address.country],
      city: [this.fridge?.address.city],
      street: [this.fridge?.address.street],
      buildingNo: [this.fridge?.address.buildingNo],
      floorNo: [this.fridge?.address.floorNo, [NumberValidators.integer]],
      roomNo: [this.fridge?.address.roomNo],
    }),
    products: [this.fridge?.products], // TODO
    image: [this.fridgeImage],
  });

  public get title(): string {
    return this.fridge
      ? $localize`:@@editFridgeHeader:Edit fridge`
      : $localize`:@@createFridgeHeader:Add new fridge`;
  }

  public get submitText(): string {
    return this.fridge
      ? $localize`:@@saveChanges:Save changes`
      : $localize`:@@createFridge:Create fridge`;
  }

  private get mode(): FormMode {
    return this.fridge ? FormMode.Edit : FormMode.Create;
  }

  public earlyErrorStateMatcher = new EarlyErrorStateMatcher();
  public comboErrorStateMatcher = new ComboErrorStateMatcher();

  private pristine$ = this.form.valueChanges.pipe(
    map((): boolean => {
      return this.form.pristine;
    }),
    startWith(this.form.pristine)
  );

  private invalid$ = this.form.statusChanges.pipe(
    map((status: FormControlStatus): boolean => {
      return !(status === 'VALID');
    }),
    startWith(this.form.invalid)
  );

  private submitted$ = new Subject<boolean>();

  private submitting$ = this.store
    // .select(selectFridgeSubmitting(this.fridge?.id || null))
    .pipe(startWith(false));

  public submitDisabled$ = combineLatest([
    this.pristine$,
    this.invalid$,
    this.submitting$,
  ]).pipe(
    map(([pristine, invalid, submitting]) => {
      return pristine || invalid || submitting;
    })
  );

  private canClose$ = combineLatest([this.submitted$, this.submitting$]).pipe(
    map(([submitted, submitting]) => {
      return submitted && !submitting;
    })
  );

  private destroy$ = new Subject();

  public constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<FridgeFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: FridgeDialogData
  ) {}

  public ngOnInit(): void {
    this.canClose$
      .pipe(takeUntil(this.destroy$))
      .subscribe((canClose: boolean) => {
        if (canClose) {
          this.dialogRef.close();
        }
      });
  }

  public ngOnDestroy(): void {
    this.submitted$.complete();
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const fridgeData = {
      ...this.form.value,
      imageUrl: this.form.value.image?.url || null,
    }; /* as FridgeFields */

    switch (this.mode) {
      case FormMode.Create:
        // this.store.dispatch(
        //   FridgesActions.createFridge({
        //     fridgeData,
        //   })
        // );
        break;
      case FormMode.Edit:
        // this.store.dispatch(
        //   FridgesActions.updateFridge({
        //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        //     id: this.fridge!.id,
        //     fridgeData,
        //   })
        // );
        break;
      default:
        throw new Error('Unsupported form mode');
    }

    this.submitted$.next(true);
  }

  public controlHasError = controlHasError.bind(this.form);
  public getControlError = getControlError.bind(this.form);
}
