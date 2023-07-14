import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthSession } from 'app/state/auth/auth.slice';
import { User } from 'app/core/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  getSession(): Observable<AuthSession | undefined> {
    throw new Error('Method not implemented!');
  }

  signup(): Observable<User> {
    throw new Error('Method not implemented!');
  }

  login(): Observable<AuthSession> {
    throw new Error('Method not implemented!');
  }

  logout(): Observable<void> {
    throw new Error('Method not implemented!');
  }
}
