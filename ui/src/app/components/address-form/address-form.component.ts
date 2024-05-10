import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AddressForm } from '../../interface/AddressForm';
import { AddressViaCEP } from '../../interface/AddressViaCEP';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { BrasilAPIService } from '../../services/brasil-api.service';
import { City, State } from '../../interface/BrasilAPI';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {

  constructor(private httpClient: HttpClient, private router: Router, private brasilApi: BrasilAPIService) { }
  states: State[] = [];
  cities: City[] = [];
  selectedState!: State;
  @Input() address!: AddressForm;
  @Output() submit = new EventEmitter<boolean>();

  findViaCEP() {
    this.httpClient.get<AddressViaCEP>('https://viacep.com.br/ws/' + this.address.zipCode + '/json/')
      .subscribe((response: AddressViaCEP) => {
        this.address.street = response.logradouro;
        this.address.complement = response.complemento;
        this.address.city = response.localidade;
        this.address.state = response.uf;
      });
  }

  changeState() {
    this.address  .state = this.selectedState.nome;
    this.brasilApi.getCities(this.selectedState.sigla).subscribe(cities => {
      this.cities = cities.sort((a, b) => a.nome.localeCompare(b.nome));
    });
  }

  ngOnInit() {
    this.brasilApi.getStates().subscribe(states => {
      this.states = states.sort((a, b) => a.nome.localeCompare(b.nome));
      this.selectedState = states.find(state => state.nome == this.address.state)!;
      if (this.selectedState) {
        this.changeState();
      }
    });
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  emitSubmit() {
    this.submit.emit();
  }
}
