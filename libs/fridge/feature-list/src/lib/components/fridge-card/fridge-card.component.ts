import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, catchError, finalize, of, takeUntil } from 'rxjs';

import { Fridge, ProductQuantity } from 'fridge-domain';
import { FridgeFacade } from 'fridge-data-access';
import { StaticAssetService } from 'shared-data-access';
import { ConfirmDeleteComponent } from 'shared-ui';
import { FileWithUrl } from 'shared-util-forms';
import { UiFacade } from 'private-shared-data-access';

import { FridgeFormComponent } from 'fridge-feature-form';

@Component({
  selector: 'lib-fridge-card',
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
    private fridgeFacade: FridgeFacade,
    @Optional() private uiFacade: UiFacade
  ) {}

  public ngOnInit(): void {
    this.fridgeFacade
      .getFridgeProducts$(this.fridge.id)
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
    if (!this.fridge?.imageUrl) {
      return of(null);
    }

    this.uiFacade?.startLoading();

    return this.staticAssetService.fetchAsset(this.fridge.imageUrl).pipe(
      catchError(() => of(null)),
      finalize(() => this.uiFacade?.finishLoading()),
      takeUntil(this.destroy$)
    );
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
          this.fridgeFacade.deleteFridge(this.fridge.id);
        }
      });
  }
}
