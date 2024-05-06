import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === 'api/auth' || req.url === 'api/auth/register') {
      return next.handle(req);
    }
    const token = this.authService.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', (token ? `Bearer ${token}` : ''))
    });
    return next.handle(authReq).pipe(tap(() => { }, error => {
      if (error.status === 401) {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      }
    }));
  }
}