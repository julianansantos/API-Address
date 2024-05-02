import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === 'api/auth') {
      return next.handle(req);
    }
    const token = this.authService.getToken();
    console.log('AuthInterceptor', token);
    const authReq = req.clone({
      headers: req.headers.set('Authorization', (token ? `Bearer ${token}` : ''))
    });
    return next.handle(authReq);
  }
}