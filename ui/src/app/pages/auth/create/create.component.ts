import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Login } from '../../../interface/Login';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  loginObject: Login = {
    username: '',
    password: ''
  };
  constructor(private router: Router, private http: HttpClient, private _snackBar: MatSnackBar, private authService: AuthService) { }

  register() {
    this.authService.register(this.loginObject.username, this.loginObject.password)
      .pipe(catchError((error: HttpErrorResponse) => {
        this._snackBar.open('Não foi possível registrar esse usuário', 'Fechar');
        return throwError(() => error);
      })).subscribe(() => {
        this._snackBar.open('Usuário registrado com sucesso', 'Fechar');
        this.goBack();
      });
  }

  goBack() {
    this.router.navigateByUrl('/login');
  }
}
