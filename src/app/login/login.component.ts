import { Component } from '@angular/core';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { JwtAuth } from '../models/jwtAuth';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  isRegister: boolean = true;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  register(registerDto: Register) {
    this.authService.register(registerDto).
    pipe(
      catchError((error) => {
        this.toastr.error('Erro ao tentar fazer o cadastro. Certifique-se de colocar o código de segurança correto e tente novamente.');
        throw error;
      }), tap(() => {
        this.toastr.success('Cadastro bem-sucedido!')
      })
    ).subscribe();

    // router para a página de login pós register
    this.router.navigate(['/home'])

    // limpar o formulário
    this.registerDto = new Register();

  }

  login(loginDto: Login) {
    this.authService.login(loginDto).
    pipe(
      catchError((error) => {
        this.toastr.error('Erro ao tentar fazer o login. Verifique o usuário/senha e tente novamente.');
        throw error;
      }), tap(() => {
        this.toastr.success('Login bem-sucedido!')
      })
      
    )
    .subscribe((jwtDto => {
      localStorage.setItem('jwtToken', jwtDto.token);
      
      this.loginDto = new Login();
      
      this.router.navigate(['/home']);

      // teste
      const token = localStorage.getItem(jwtDto.token);
      this.authService.authenticate(loginDto);
      console.log('uhu');
    }));
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  showToaster() {
    this.toastr.success('Some messages', 'title');
  }

}
