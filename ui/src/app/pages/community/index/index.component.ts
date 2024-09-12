import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Community } from '@app/interface/Community';
import { Pagination } from '@app/interface/Pagination';
import { CommunityService } from '@app/services/community.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule    
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
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
  constructor(private communityService: CommunityService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

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



}
