import { ChangeDetectionStrategy, Component } from '@angular/core';

interface NavTab {
  link: string;
  label: string;
}

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {
  public tabs: NavTab[] = [
    { link: 'login', label: 'Log in' },
    { link: 'signup', label: 'Sign up' },
  ];

  public activeTab = this.tabs[0];

  public onTabSelect(tab: NavTab): void {
    this.activeTab = tab;
  }
}
