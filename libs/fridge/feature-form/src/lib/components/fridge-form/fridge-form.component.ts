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

import {
  Fridge,
  FridgeFields,
  ProductQuantity,
  ProductQuantityDto,
} from 'fridge-domain';
import { FridgeFacade } from 'fridge-data-access';
import {
  NumberValidators,
  EarlyErrorStateMatcher,
  FileWithUrl,
  controlHasError,
  getControlError,
  FormMode,
} from 'shared-util-forms';

interface FridgeDialogData {
  fridge?: Fridge;
  products?: ProductQuantity[];
  image?: FileWithUrl | null;
}

@Component({
  selector: 'lib-fridge-form',
  templateUrl: './fridge-form.component.html',
  styleUrls: ['./fridge-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EarlyErrorStateMatcher],
})
export class FridgeFormComponent implements OnInit, OnDestroy {
  public fridge = this.data?.fridge;
  private fridgeProducts = this.data?.products || [];
  private fridgeImage = this.data?.image;

  public form = this.formBuilder.nonNullable.group({
    model: [this.fridge?.model, [Validators.required]],
    description: [this.fridge?.description, [Validators.maxLength(1000)]],
    geolocation: [this.fridge?.geolocation, [Validators.required]],
    address: this.formBuilder.nonNullable.group({
      country: [this.fridge?.address.country],
      city: [this.fridge?.address.city],
      street: [this.fridge?.address.street],
      buildingNo: [this.fridge?.address.buildingNo],
      floorNo: [
        this.fridge?.address.floorNo,
        [NumberValidators.number, NumberValidators.integer],
      ],
      roomNo: [this.fridge?.address.roomNo],
    }),
    products: this.formBuilder.nonNullable.control(this.fridgeProducts),
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

  private submitting$ = this.fridgeFacade
    .getFridgeSubmitting$(this.fridge?.id || null)
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

  public controlHasError = controlHasError.bind(this.form);
  public getControlError = getControlError.bind(this.form);

  private destroy$ = new Subject();

  public constructor(
    private formBuilder: FormBuilder,
    private fridgeFacade: FridgeFacade,
    public dialogRef: MatDialogRef<FridgeFormComponent>,
    public earlyErrorStateMatcher: EarlyErrorStateMatcher,
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
      products:
        this.form.value.products?.map(
          ({ product, quantity }: ProductQuantity): ProductQuantityDto => {
            return {
              productId: product?.id || '',
              quantity,
            };
          }
        ) || [],
      imageUrl: this.form.value.image?.url || null,
    } as FridgeFields;

    switch (this.mode) {
      case FormMode.Create:
        this.fridgeFacade.createFridge(fridgeData);
        break;
      case FormMode.Edit:
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.fridgeFacade.updateFridge(this.fridge!.id, fridgeData);
        break;
      default:
        throw new Error('Unsupported form mode');
    }

    this.submitted$.next(true);
  }
}
