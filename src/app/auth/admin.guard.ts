import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const adminGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('jwtToken');
  const router = inject(Router);
  console.log('jwtToken', token)

  if(token) {
    return true;
    
  } else {
    router.navigate(['login']);
    alert('Você está desconectado.')
    return false;
  }
};

