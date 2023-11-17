import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthService } from '../services/auth.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.tokenStorageService.getAccessToken();

    let authRequest = (accessToken != null)
      ? this.addTokenHeader(httpRequest, accessToken)
      : httpRequest;

    return next.handle(authRequest).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return this.handleUnauthorizedResponseError(httpRequest, next);
      }
      return throwError(() => err);
    }));
  }

  private handleUnauthorizedResponseError(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.tokenStorageService.getRefreshToken();

      if (refreshToken) {
        return this.authService.refreshToken(refreshToken).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            this.tokenStorageService.saveAccessToken(token.accessToken);
            this.tokenStorageService.saveRefreshToken(token.refreshToken);
            this.refreshTokenSubject.next(token.accessToken);

            //console.debug('[interceptor] Token refreshed'); //#DEBUG
            return next.handle(this.addTokenHeader(request, token.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            //console.debug('[interceptor] Cannot use Refresh Token '); //#DEBUG
            this.redirectLogout();

            return throwError(() => err);
          })
        );
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`) });
  }

  private redirectLogout() {
    this.tokenStorageService.signOut();
    this.router.navigate(["/login"]).then(() => {});
  }

}
