import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoginCredentials, SignupCredentials, User } from 'user-domain';

import {
  selectAuthToken,
  selectLoggedUser,
  selectSessionExpirationTime,
} from '../state/auth.selectors';
import { AuthActions } from '../state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  public constructor(private store: Store) {}

  public getLoggedUser$(): Observable<User | undefined> {
    return this.store.select(selectLoggedUser);
  }

  public getAuthToken$(): Observable<string | undefined> {
    return this.store.select(selectAuthToken);
  }

  public getSessionExpirationTime$(): Observable<Date | undefined> {
    return this.store.select(selectSessionExpirationTime);
  }

  public signup(credentials: SignupCredentials): void {
    this.store.dispatch(AuthActions.signup({ credentials }));
  }

  public login(credentials: LoginCredentials): void {
    this.store.dispatch(AuthActions.login({ credentials }));
  }

  public logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
