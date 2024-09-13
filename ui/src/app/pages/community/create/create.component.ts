import { CommonModule, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '@app/components/confirmation-dialog/confirmation-dialog.component';
import { Community } from '@app/interface/Community';
import { CommunityForm } from '@app/interface/CommunityForm';
import { Pagination } from '@app/interface/Pagination';
import { AuthService } from '@app/services/auth.service';
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
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    CommonModule,
    NgIf
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateComponent {
  community: CommunityForm = {
    name: '',
    description: ''
  }
  displayedColumns: string[] = ['name', 'description', 'actions'];
  pagination: Pagination<Community> = {
    content: [],
    lastPage: 0,
    page: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0
  };
  mostPopularCommunities: Community[] = [];
  loading: boolean = false;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private communityService: CommunityService,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}


  goCommunity() {
    this.router.navigateByUrl('community/index');
  }

  ngOnInit() {
    this.paginate();
  }

  handlePageEvent(e: PageEvent) {
    this.pagination.page = e.pageIndex;
    this.paginate();
  }

  paginate() {
    this.loading = true;
    setTimeout(()=>{
      this.communityService.paginate(this.pagination.page).subscribe(response => {
        this.pagination.content = response.content;
        this.pagination.totalElements = response.totalElements;
        this.pagination.totalPages = response.totalPages;
        this.pagination.pageSize = response.pageSize;
        this.pagination.page = response.page;
        this.loading = false;
      }, error => {
        this.loading = false; // Conclui o carregamento em caso de erro
        this._snackBar.open('Erro ao carregar os dados', 'Fechar');
        console.error('Erro:', error);
      });
    }, 1000)
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
        this.goCommunity();
      }
    });
  }

  create() {
      const isAdmin = this.authService.getUserAdmin();
      if (!isAdmin) {
        this._snackBar.open('Você não tem permissão para criar uma comunidade', 'Fechar', {
          duration: 5000
        });
        return;
      }
      this.communityService.create(this.community)
        .pipe(
          catchError((errorResponse: HttpErrorResponse) => {
            this._snackBar.open(
              errorResponse.error?.errors
                ? errorResponse.error?.errors[0]?.defaultMessage
                : 'Erro ao salvar comunidade',
              'Fechar',
              {
                duration: 5000
              }
            );
            return throwError(() => errorResponse);
          })
        )
        .subscribe(() => {
          this._snackBar.open('Comunidade criada com sucesso', 'Fechar');
          this.goCommunity();
        });
    }

}
