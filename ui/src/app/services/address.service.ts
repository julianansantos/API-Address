import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../interface/Address';
import { AddressForm } from '../interface/AddressForm';
import { Pagination } from '../interface/Pagination';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private httpClient: HttpClient) { }

  create(address: AddressForm) {
    return this.httpClient.post('api/address', address)
  }

  update(id: number, address: AddressForm) {
    return this.httpClient.put(`api/address/${id}`, address)
  }

  delete(id: number) {
    return this.httpClient.delete(`api/address/${id}`)
  }

  get(id: number) {
    return this.httpClient.get<Address>(`api/address/${id}`)
  }

  paginate(page: number) {
    return this.httpClient.get<Pagination<Address>>(`api/address`, {
      params: {
        page,
      }
    })
  }
}
