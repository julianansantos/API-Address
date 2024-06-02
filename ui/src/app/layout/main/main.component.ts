import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { CommunityService } from '@app/services/community.service';
import { Community } from '@app/interface/Address';
import { NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, NgFor, MatIcon],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  mostPopularCommunities: Community[] = [];
  constructor(private authService: AuthService, private router: Router, private communityService: CommunityService) { 
    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.findMostPopularCommunities();
      }
    });
  }
  ngOnInit() {
    this.findMostPopularCommunities();
  }
  logout() {
    this.authService.logout();
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  goRegisterAddress() {
    this.router.navigateByUrl('/address/new');
  }

  findMostPopularCommunities() {
    this.communityService.findMostPopular().subscribe(response => {
      this.mostPopularCommunities = response;
    });
  }

}
