import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(private authService: AuthService, private router: Router) { }
  logout() {
    this.authService.logout();
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  goRegisterAddress() {
    this.router.navigateByUrl('/address/new');
  }
}
