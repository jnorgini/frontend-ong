import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../models/login';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDto: Login = new Login();
  formSubmitted = false;
  loading = false;
  hide = true;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getAccessToken()) {
      this.router.navigate(['/home']).then(() => { });
    }
  }

  login(loginDto: Login) {
    this.formSubmitted = true;
    if (loginDto.username === '' || loginDto.password === '') {
      this.toastr.warning('Por favor, preencha todos os campos.');
      return;
    }
    this.loading = true;
    const tempoEmMilissegundos = 120000;
    this.authService.login(loginDto)
      .pipe(
        catchError((error) => {
          this.toastr.error('Erro ao tentar fazer o login. Verifique o usuário/senha e tente novamente.');
          throw error;
        }),
        tap(() => {
          this.toastr.success('Login bem-sucedido!')
        })
      )
      .subscribe((jwtDto => {
        this.tokenStorage.saveAccessToken(jwtDto.accessToken);
        this.tokenStorage.saveRefreshToken(jwtDto.refreshToken);
        window.location.reload();
        setTimeout(() => {
          this.loading = false;
        }, tempoEmMilissegundos);
      }));
  }

}
