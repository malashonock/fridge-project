import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface ConfirmDeleteDialogData {
  itemType: string;
}

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteComponent {
  public get itemType(): string {
    return this.data?.itemType || $localize`:@@item:item`;
  }

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data?: ConfirmDeleteDialogData
  ) {}
}
