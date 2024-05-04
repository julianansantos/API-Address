import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  login(username: string, password: string) {
    return this.httpClient.post<{ token: string }>('api/auth', null, {
      headers: {
        authorization: 'Basic ' + btoa(username + ':' + password),
        // to not open the browser's default login popup
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      }
    }).pipe(tap(response => {
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
    }))
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
