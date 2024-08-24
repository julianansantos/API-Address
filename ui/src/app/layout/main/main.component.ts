import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { CommunityService } from '@app/services/community.service';
import { Community } from '@app/interface/Address';
import { NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, NgFor, MatIcon, MatButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  mostPopularCommunities: Community[] = [];
  subscription: any;
  constructor(private authService: AuthService, private router: Router, private communityService: CommunityService) { 
  }
  ngOnInit() {
    this.findMostPopularCommunities();
    this.subscription = this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.findMostPopularCommunities();
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
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
