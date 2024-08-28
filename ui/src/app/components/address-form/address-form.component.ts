import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AddressForm } from '@app/interface/AddressForm';
import { AddressViaCEP } from '@app/interface/AddressViaCEP';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { BrasilAPIService } from '@app/services/brasil-api.service';
import { City, State } from '@app/interface/BrasilAPI';
import { Community } from '@app/interface/Address';
import { CommunityService } from '@app/services/community.service';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

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
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private brasilApi: BrasilAPIService,
    private communityService: CommunityService
  ) { }
  states: State[] = [];
  cities: City[] = [];
  selectedState!: State;
  communities: Community[] = [];
  @Input() address!: AddressForm;
  @Output() submit = new EventEmitter<boolean>();

  findViaCEP() {
    this.brasilApi.findCEP(this.address.zipCode)
      .subscribe((response: AddressViaCEP) => {
        this.address.street = response.logradouro;
        this.address.complement = response.complemento;
        this.address.state = response.uf;
        this.selectedState = this.states.find(state => state.sigla == response.uf)!;
        if (this.selectedState) {
          this.changeState();
        }
        this.address.city = response.localidade?.toUpperCase();
      });
  }

  changeState() {
    this.address.state = this.selectedState.nome;
    this.brasilApi.getCities(this.selectedState.sigla).subscribe(cities => {
      this.cities = cities.sort((a, b) => a.nome.localeCompare(b.nome));
    });
  }

  findCommunities() {
    this.communityService.findAll().subscribe(communities => {
      this.communities = communities;
    });

  }

  ngOnInit() {
    this.findCommunities();
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
