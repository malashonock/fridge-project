import { Component } from '@angular/core';

interface NavTab {
  link: string;
  label: string;
}

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent {
  tabs: NavTab[] = [
    { link: 'login', label: 'Log in' },
    { link: 'signup', label: 'Sign up' },
  ];

  activeTab = this.tabs[0];

  onTabSelect(tab: NavTab) {
    this.activeTab = tab;
  }
}
