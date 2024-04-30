import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../../../interface/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginObject: Login = {
    username: '',
    password: ''
  };

  constructor(private router: Router) { }

  onLogin() {
    if (this.loginObject.username === 'admin' && this.loginObject.password === 'admin') {
      this.router.navigateByUrl('/home');
    } else {
      alert('Credenciais inválidas!')
    }
  }
}
