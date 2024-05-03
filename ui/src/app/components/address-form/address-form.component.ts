import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AddressForm } from '../../interface/AddressForm';
import { AddressViaCEP } from '../../interface/AddressViaCEP';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {

  constructor(private httpClient: HttpClient, private router: Router) { }

  @Input() address!: AddressForm;
  @Output() submit = new EventEmitter<boolean>();

  findViaCEP() {
    this.httpClient.get<AddressViaCEP>('https://viacep.com.br/ws/' + this.address.zipCode + '/json/')
      .subscribe((response: any) => {
        this.address.street = response.logradouro;
        this.address.complement = response.complemento;
        this.address.city = response.localidade;
        this.address.state = response.uf;
      });
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  emitSubmit() {
    this.submit.emit();
  }
}
