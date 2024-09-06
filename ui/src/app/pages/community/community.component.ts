import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '@app/components/confirmation-dialog/confirmation-dialog.component';
import { Community } from '@app/interface/Community';
import { CommunityForm } from '@app/interface/CommunityForm';
import { CommunityService } from '@app/services/community.service';
import { catchError, throwError } from 'rxjs';



@Component({
  selector: 'app-community',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss'
})
export class CommunityComponent {
  community: CommunityForm = {
    name: '',
    description: ''
  }
  
  constructor(public dialog: MatDialog, private router: Router, private communityService: CommunityService, private _snackBar: MatSnackBar) {}

  goHome() {
    this.router.navigateByUrl('/home');
  }


  onSubmit() {
    const confirm = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Salvar Comunidade',
        message: 'Deseja realmente salvar a comunidade?',
        confirm: 'Confirmar',
        cancel: 'Cancelar',
      },
    });
    confirm.afterClosed().subscribe(result => {
      if (result) {
        this.create();
      } else {
        this.goHome();
      }
    });
  }

  create() {
    this.communityService.create(this.community)
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        this._snackBar.open(errorResponse.error?.errors ? errorResponse.error?.errors[0]?.defaultMessage : 'Erro ao salvar comunidade', 'Fechar', {
          duration: 5000
        });
        return throwError(() => errorResponse);
      }))
      .subscribe(() => {
        this._snackBar.open('Comunidade criada com sucesso', 'Fechar')
        this.goHome();
      });
  }

}
