import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../../../interface/login';
import { Router } from '@angular/router';
import { HttpClient, HttpContext, HttpContextToken, HttpHeaders } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
export const ERROR_COUNT = new HttpContextToken(() => 0);
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginObject: Login = {
    username: '',
    password: ''
  };
  authenticated = false;
  loading = false;

  constructor(private router: Router, private http: HttpClient, private _snackBar: MatSnackBar) { }

  onLogin() {
    this.authenticate()
  }

  authenticate() {

    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa(this.loginObject.username + ':' + this.loginObject.password),
      'Content-Type': 'application/json',

    });
    this.loading = true;
    this.http.post<{ token: string }>(`api/auth`, null, {
      headers: headers, withCredentials: false
      
    }).subscribe(response => {
      if (response.token) {
        this.authenticated = true;
        this.router.navigateByUrl('/home');
      } else {
        this.authenticated = false;
        this._snackBar.open('Credencias inválidas', 'Close', {
          duration: 2000,
        });
      }
      return true;
    })
      .add(() => {
        this.loading = false;
        console.log('Finalizou');
      });

  }
}
