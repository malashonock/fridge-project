import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() compactWidthMode = false;

  private _showMobileMenu = false;

  get showMobileMenu(): boolean {
    return this._showMobileMenu;
  }

  @Input() set showMobileMenu(value: boolean) {
    this._showMobileMenu = value;
    this.showMobileMenuChange.emit(value);
  }

  @Output() showMobileMenuChange = new EventEmitter<boolean>();
}
