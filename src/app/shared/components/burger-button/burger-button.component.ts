import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-burger-button',
  templateUrl: './burger-button.component.html',
  styleUrls: ['./burger-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BurgerButtonComponent {
  @Input() showMobileMenu = false;
  @Output() showMobileMenuChange = new EventEmitter<boolean>();

  toggleShowMobileMenu(): void {
    this.showMobileMenuChange.emit(!this.showMobileMenu);
  }
}
