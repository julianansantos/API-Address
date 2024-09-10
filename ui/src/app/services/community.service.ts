import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Community } from '@app/interface/Community';
import { CommunityForm } from '@app/interface/CommunityForm';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private httpClient: HttpClient) {
    
  }

  create(community: CommunityForm) {
    return this.httpClient.post('api/community', community)
  }


  findAll() {
    return this.httpClient.get<Community[]>('api/community');
  }

  findMostPopular() {
    return this.httpClient.get<Community[]>('api/community/top');
  }

  findCommunityMoreAddress(){
    return this.httpClient.get<Community[]>('api/community/moreAddress')
  }

}
