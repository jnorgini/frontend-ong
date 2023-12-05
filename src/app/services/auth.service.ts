import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { JwtAuth } from '../models/jwtAuth';

const AUTH_API_URL = `${environment.API_URL}/auth`;
const AUTH_API_LOGIN = `${AUTH_API_URL}/login`;
const AUTH_API_REFRESH_TOKEN = `${AUTH_API_URL}/refresh-token`;

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uninterceptedHttp: HttpClient;

  constructor(
    private http: HttpClient,
    backend: HttpBackend
  ) {
    this.uninterceptedHttp = new HttpClient(backend);
  }

  public login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(AUTH_API_LOGIN, user, HTTP_OPTIONS);
  }

  public refreshToken(token: string): Observable<JwtAuth> {
    return this.uninterceptedHttp.post<JwtAuth>(AUTH_API_REFRESH_TOKEN, {
      refreshToken: token
    }, HTTP_OPTIONS);
  }

}
