import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Community } from '@app/interface/Address';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private httpClient: HttpClient) {
    
  }

  findAll() {
    return this.httpClient.get<Community[]>('api/community');
  }
}
