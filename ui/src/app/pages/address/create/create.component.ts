import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddressForm } from '../../../interface/AddressForm';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { AddressFormComponent } from '../../../components/address-form/address-form.component';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    AddressFormComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  address: AddressForm = {
    street: '',
    number: null,
    complement: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  }
  constructor(private router: Router, private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  onSubmit() {
    this.httpClient.post('api/address', this.address)
      .pipe(catchError((error: HttpErrorResponse) => {
        this._snackBar.open('Erro ao salvar o endereço', 'Fechar', {
          duration: 5000
        });
        return throwError(() => error);
      }))
      .subscribe(() => {
        this._snackBar.open('Endereço criado com sucesso', 'Fechar')
        this.goHome();
      });
  }

}
