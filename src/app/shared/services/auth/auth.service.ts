import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  loginCredentials,
  registerCredentials,
  IAccount,
  LoggedIn,
} from '../../models/User.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private resourceUrl = 'http://localhost:3000/api/auth';
  account = new BehaviorSubject<IAccount | null>(null);
  private authenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.authenticated.asObservable();

  constructor(private http: HttpClient) {
    const isLoggedIn = !!sessionStorage.getItem('loggedUser');
    this.authenticated.next(isLoggedIn);
  }

  register(register: registerCredentials): Observable<LoggedIn> {
    this.authenticated.next(true);
    return this.http.post<LoggedIn>(`${this.resourceUrl}/register`, register);
  }

  login(login: loginCredentials): Observable<LoggedIn> {
    this.authenticated.next(true);
    return this.http.post<LoggedIn>(`${this.resourceUrl}/login`, login);
  }

  logout(): Observable<{ message: string } | void> {
    if (sessionStorage.getItem('loggedUser')) {
      sessionStorage.clear();
    }
    this.authenticated.next(false);
    this.account.next(null);
    return this.http.delete<{ message: string }>(`${this.resourceUrl}/logout`);
  }
}
