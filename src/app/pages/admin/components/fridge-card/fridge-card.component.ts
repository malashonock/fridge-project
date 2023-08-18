import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, catchError, of, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { Fridge } from 'core/models/fridge/fridge.interface';
import { FileWithUrl } from 'core/classes/file-with-url/file-with-url.class';
import { StaticAssetService } from 'core/services/static-asset/static-asset.service';
import { ConfirmDeleteComponent } from 'shared/components/confirm-delete/confirm-delete.component';
import { FridgeFormComponent } from '../fridge-form/fridge-form.component';

@Component({
  selector: 'app-fridge-card',
  templateUrl: './fridge-card.component.html',
  styleUrls: ['./fridge-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FridgeCardComponent {
  @Input() public fridge: Fridge;

  private destroy$ = new Subject();

  public constructor(
    private dialog: MatDialog,
    private staticAssetService: StaticAssetService,
    private store: Store
  ) {}

  private fetchFridgeImage(): Observable<FileWithUrl | null> {
    return this.fridge?.imageUrl
      ? this.staticAssetService.fetchAsset(this.fridge.imageUrl).pipe(
          takeUntil(this.destroy$),
          catchError(() => of(null))
        )
      : of(null);
  }

  public openEditFridgeDialog(): void {
    event?.stopPropagation();

    this.fetchFridgeImage().subscribe((image: FileWithUrl | null): void => {
      this.dialog.open(FridgeFormComponent, {
        data: { fridge: this.fridge, image },
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
        if (deleteConfirmed) {
          // this.store.dispatch(FridgesActions.deleteFridge({ id }));
        }
      });
  }
}
