import { Component } from '@angular/core';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { JwtAuth } from '../models/jwtAuth';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'api-front';
  loginDto = new Login();
  registerDto = new Register();
  jwtDto = new JwtAuth();
  isLogin: boolean = true;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  register(registerDto: Register) {
    this.authService.register(registerDto).subscribe();
    this.router.navigate(['/login'])
  }
  

  login(loginDto: Login) {
    this.authService.login(loginDto).subscribe((jwtDto => {
      localStorage.setItem('jwtToken', jwtDto.token);
      this.router.navigate(['/pets']);
    }));
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }
}
