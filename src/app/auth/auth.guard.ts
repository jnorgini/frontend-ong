import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { TokenStorageService } from '../services/token-storage.service';

export const authGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const tokenStorage = inject(TokenStorageService);

  if (tokenStorage.getAccessToken()) {
    const routeRole = route.data['role'];

    if (routeRole && !tokenStorage.hasRole(routeRole)) {
      router.navigate(['login']).then(() => {});
      return false;
    }
    return true;
  }
  router.navigate(['login']).then(() => {});
  return false;
};
