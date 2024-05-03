import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, numberAttribute } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { AddressForm } from '../../../interface/AddressForm';
import { AddressFormComponent } from '../../../components/address-form/address-form.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    AddressFormComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  address$: AddressForm = {
    street: '',
    number: null,
    complement: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  }
  @Input({ transform: numberAttribute }) id!: number;
  constructor(private router: Router, private httpClient: HttpClient, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getAddress(this.id).then(address => {
      this.address$ = address;
    });
  }


  async getAddress(id: number) {
    const source$ = this.httpClient.get<AddressForm>('api/address/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        this._snackBar.open('Erro ao carregar o endereço', 'Fechar', {
          duration: 5000
        });
        return throwError(() => error);
      })
    )
    return await firstValueFrom(source$);
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  onSubmit() {
    this.httpClient.put(`api/address/${this.id}`, this.address$)
      .pipe(catchError((error: HttpErrorResponse) => {
        this._snackBar.open('Erro ao salvar o endereço', 'Fechar', {
          duration: 5000
        });
        return throwError(() => error);
      }))
      .subscribe(() => {
        this._snackBar.open('Endereço salvo com sucesso', 'Fechar')
        this.goHome();
      });
  }
}
