import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../../../interface/Login';
import { Router } from '@angular/router';
import { HttpContextToken, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
export const ERROR_COUNT = new HttpContextToken(() => 0);
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
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
  hide = true;
  constructor(private router: Router, private _snackBar: MatSnackBar, private authService: AuthService) { }

  onLogin() {
    this.authService.login(this.loginObject.username, this.loginObject.password)
      .pipe(catchError((error: HttpErrorResponse) => {
        this._snackBar.open('Usuário e/ou senha inválidos', 'Fechar');
        return throwError(() => error);

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

  goRegister() {
    this.router.navigateByUrl('/register');
  }

}
