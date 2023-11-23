import { Injectable } from '@angular/core';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public signOut(): void {
    window.sessionStorage.clear();
  }

  public getAccessToken(): string | null {
    return window.sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public saveAccessToken(accessToken: string): void {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  public hasRole(role: string): boolean {
    const roles = this.decodeToken(this.getAccessToken()!).payload.roles;
    return roles.includes(role);
  }

  private decodeToken(token: string): any {
    let [header, payload] = token.split('.').slice(0,2)
      .map(el => el.replace(/-/g, '+').replace(/_/g, '/'))
      .map(el => JSON.parse(window.atob(el)));

    return {header, payload};
  }

}
