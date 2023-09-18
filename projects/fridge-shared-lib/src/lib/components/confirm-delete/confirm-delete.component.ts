import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

interface ConfirmDeleteDialogData {
  itemType: string;
}

const materialModules = [MatIconModule, MatDialogModule, MatButtonModule];

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [materialModules],
})
export class ConfirmDeleteComponent {
  public get itemType(): string {
    return this.data?.itemType || $localize`:@@item:item`;
  }

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data?: ConfirmDeleteDialogData
  ) {}
}
