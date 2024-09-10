import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Community } from '@app/interface/Community';
import { CommunityForm } from '@app/interface/CommunityForm';
import { Pagination } from '@app/interface/Pagination';

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

  paginate(page: number) {
    return this.httpClient.get<Pagination<Community>>(`api/community`, {
      params: {
        page,
      }
    })
  }

}
