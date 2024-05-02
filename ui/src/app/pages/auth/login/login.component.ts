import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../../../interface/Login';
import { Router } from '@angular/router';
import { HttpClient, HttpContext, HttpContextToken, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
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

  constructor(private router: Router, private http: HttpClient, private _snackBar: MatSnackBar, private authService: AuthService) { }

  onLogin() {
    this.authService.login(this.loginObject.username, this.loginObject.password)
      .pipe(catchError((error: HttpErrorResponse) => {
        console.error(error);
        this._snackBar.open('Usuário ou senha inválidos', 'Fechar', {
          duration: 5000,
        });
        return throwError('Usuário ou senha inválidos');

      }))
      .subscribe(response => {
        if (response.token) {
          this.authenticated = true;
          this.router.navigateByUrl('/home');
        }
        return true;
      })
      .add(() => {
        this.loading = false;
      })
  }

}
