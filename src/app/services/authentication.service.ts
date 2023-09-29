import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtAuth } from '../models/jwtAuth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  registerUrl = "auth/register"
  loginUrl = "auth/login"

  isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  public register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${environment.apiUrl}/${this.registerUrl}`, user);
  }

  public login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${environment.apiUrl}/${this.loginUrl}`, user);
  }

  authenticate(login: Login): boolean {
    if(localStorage.getItem !== null) {
      this.isAuthenticated = true;
      this.router.navigate(['/home']);
      return true;
    }
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
    return false;
  }

}
