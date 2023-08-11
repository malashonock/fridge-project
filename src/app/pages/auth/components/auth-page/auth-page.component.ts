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
    { link: 'login', label: $localize`:@@logIn:Log in` },
    { link: 'signup', label: $localize`:@@signUp:Sign up` },
  ];

  public activeTab = this.tabs[0];

  public onTabSelect(tab: NavTab): void {
    this.activeTab = tab;
  }

  public tabTrackBy(index: number, tab: NavTab): string {
    return tab.label;
  }
}
