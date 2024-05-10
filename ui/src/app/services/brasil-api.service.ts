import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City, State } from '../interface/BrasilAPI';

const API_URL = 'https://brasilapi.com.br/api';

@Injectable({
  providedIn: 'root'
})
export class BrasilAPIService {
  constructor(private httpClient: HttpClient) { }

  getStates() {
    return this.httpClient.get<State[]>(`${API_URL}/ibge/uf/v1`);
  }

  getCities(uf: string) {
    return this.httpClient.get<City[]>(`${API_URL}/ibge/municipios/v1/${uf}?providers=dados-abertos-br,gov,wikipedia`);
  }
}
