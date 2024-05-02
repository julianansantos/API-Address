import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { AuthService } from '../../services/auth.service';
import { Pagination } from '../../interface/Pagination';
import { Address } from '../../interface/Address';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  displayedColumns: string[] = ['street', 'number', 'complement', 'city', 'state', 'zipCode', 'country', 'actions'];
  dataSource: Address[] = [];

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.httpClient.get<Pagination<Address>>('api/address').subscribe(response => {
      this.dataSource = response.content;
    });
  }
}

