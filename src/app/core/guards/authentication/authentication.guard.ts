import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthState } from 'app/state/auth/auth.selectors';
import { AuthSessionState } from 'app/state/auth/auth.slice';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store
      .select(selectAuthState)
      .pipe(map((authState: AuthSessionState) => !!authState));
  }
}
