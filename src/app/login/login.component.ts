import { Component } from '@angular/core';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { JwtAuth } from '../models/jwtAuth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginDto = new Login();
  registerDto = new Register();
  jwtDto = new JwtAuth();
  isLogin: boolean = true;
  isRegister: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  //TODO: refactor
  // register(registerDto: Register) {
  //   this.authService.register(registerDto).
  //   pipe(
  //     catchError((error) => {
  //       this.toastr.error('Erro ao tentar fazer o cadastro. Certifique-se de colocar o código de segurança correto e tente novamente.');
  //       throw error;
  //     }), tap(() => {
  //       this.toastr.success('Cadastro bem-sucedido!')
  //     })
  //   ).subscribe();
  //
  //   this.router.navigate(['/home'])
  //
  //   this.registerDto = new Register();
  //
  // }

  //TODO: refactor
  // login(loginDto: Login) {
  //   this.authService.login(loginDto).
  //   pipe(
  //     catchError((error) => {
  //       this.toastr.error('Erro ao tentar fazer o login. Verifique o usuário/senha e tente novamente.');
  //       throw error;
  //     }), tap(() => {
  //       this.toastr.success('Login bem-sucedido!')
  //     })
  //
  //   )
  //   .subscribe((jwtDto => {
  //     localStorage.setItem('jwtToken', jwtDto.token);
  //
  //     this.loginDto = new Login();
  //
  //     const token = localStorage.getItem(jwtDto.token);
  //     this.authService.authenticate(loginDto);
  //   }));
  // }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  showToaster() {
    this.toastr.success('Some messages', 'title');
  }

}
