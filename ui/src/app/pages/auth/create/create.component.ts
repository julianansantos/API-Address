import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../components/confirmation-dialog/confirmation-dialog.component';
import { DefaultLoginLayoutComponent } from '@app/layout/default-login/default-login-layout.component';
import { CommonModule } from '@angular/common';
import { UserForm } from '@app/interface/UserForm';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    DefaultLoginLayoutComponent,
    CommonModule
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  user: UserForm = {
    name: '',
    username: '',
    password: '',
    passwordConfirm: '',
    role: ''
  };

  userRoles: string[] = ['ADMIN', 'USER'];
  selectedRole: string = '';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  register() {
    this.authService.register(this.user.username, this.user.password, this.user.role)
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        this._snackBar.open(
          errorResponse.error?.errors ? errorResponse.error?.errors[0]?.defaultMessage : 'Não foi possível registrar esse usuário',
          'Fechar'
        );
        return throwError(() => errorResponse);
      }))
      .subscribe(() => {
        this._snackBar.open('Usuário registrado com sucesso', 'Fechar');
        this.goBack();
      });
  }

  submit() {
    if (this.user.password !== this.user.passwordConfirm) {
      this._snackBar.open('As senhas não conferem', 'Fechar');
      return;
    }
    const confirm = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Criar usuário',
        message: 'Deseja realmente criar esse usuário?',
        confirm: 'Confirmar',
        cancel: 'Cancelar',
      },
    });
    confirm.afterClosed().subscribe(result => {
      if (result) {
        this.register();
      } else {
        this.goBack();
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('/login');
  }

  trackByRole(role: string): string {
    return role;
  }
}
