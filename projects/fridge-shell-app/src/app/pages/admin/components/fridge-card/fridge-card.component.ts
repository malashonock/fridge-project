import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, catchError, of, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { Fridge } from '@shell/core/models/fridge/fridge.interface';
import { FileWithUrl } from '@shell/core/classes/file-with-url/file-with-url.class';
import { StaticAssetService } from '@shell/core/services/static-asset/static-asset.service';
import { ConfirmDeleteComponent } from '@shell/shared/components/confirm-delete/confirm-delete.component';
import { FridgeFormComponent } from '../fridge-form/fridge-form.component';
import { ProductQuantity } from '@shell/core/models/fridge/product-quantity.interface';
import { selectFridgeProducts } from '@shell/store/fridges/fridges.selectors';
import { FridgesActions } from '@shell/store/fridges/fridges.actions';

@Component({
  selector: 'app-fridge-card',
  templateUrl: './fridge-card.component.html',
  styleUrls: ['./fridge-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FridgeCardComponent implements OnInit, OnDestroy {
  @Input() public fridge: Fridge;

  private fridgeProducts: ProductQuantity[] | undefined;

  private destroy$ = new Subject();

  public constructor(
    private dialog: MatDialog,
    private staticAssetService: StaticAssetService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.store
      .select(selectFridgeProducts(this.fridge.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((products: ProductQuantity[] | undefined): void => {
        this.fridgeProducts = products;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private fetchFridgeImage(): Observable<FileWithUrl | null> {
    return this.fridge?.imageUrl
      ? this.staticAssetService.fetchAsset(this.fridge.imageUrl).pipe(
          catchError(() => of(null)),
          takeUntil(this.destroy$)
        )
      : of(null);
  }

  public openEditFridgeDialog(): void {
    event?.stopPropagation();

    this.fetchFridgeImage().subscribe((image: FileWithUrl | null): void => {
      this.dialog.open(FridgeFormComponent, {
        data: { fridge: this.fridge, products: this.fridgeProducts, image },
      });
    });
  }

  public openDeleteFridgeDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        itemType: $localize`:@@fridge:fridge`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((deleteConfirmed: boolean) => {
        if (deleteConfirmed && this.fridge) {
          this.store.dispatch(
            FridgesActions.deleteFridge({ id: this.fridge.id })
          );
        }
      });
  }
}