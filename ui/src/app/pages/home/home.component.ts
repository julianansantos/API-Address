import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../../services/auth.service';
import { Pagination } from '../../interface/Pagination';
import { Address } from '../../interface/Address';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { JsonPipe } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  displayedColumns: string[] = ['street', 'number', 'complement', 'city', 'state', 'zipCode', 'country', 'actions'];
  pagination: Pagination<Address> = {
    content: [],
    lastPage: 0,
    page: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0
  };

  constructor(private httpClient: HttpClient, private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.paginate();
  }

  handlePageEvent(e: PageEvent) {
    this.pagination.page = e.pageIndex;
    this.paginate();
  }

  paginate() {
    this.httpClient.get<Pagination<Address>>('api/address', {
      params: {
        page: this.pagination.page
      }
    }).subscribe(response => {
      this.pagination.content = response.content;
      this.pagination.totalElements = response.totalElements;
      this.pagination.totalPages = response.totalPages;
      this.pagination.pageSize = response.pageSize;
      this.pagination.page = response.page;

    });
  }

  deleteAddress(id: number) {
    this.httpClient.delete('api/address/' + id).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 404) {
        this._snackBar.open('Endereço não existe. Atualize a página', 'Fechar');
      } else {
        this._snackBar.open('Erro ao deletar endereço', 'Fechar');
      }
      return throwError(() => error);

    })).subscribe(() => {
      this.paginate();
    });
  }
}

