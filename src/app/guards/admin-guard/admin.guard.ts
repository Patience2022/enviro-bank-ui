import {CanActivateFn, Router} from '@angular/router';
import {Inject} from "@angular/core";

export const adminGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem("JWT_KEY");
  const role = sessionStorage.getItem('USER_ROLE');
  const router = Inject(Router);
  // @ts-ignore
  if(token && role ==='[ROLE_Admin]'){
    return true;
  }
  else {
    router.navigate(['login'])
    return false;
  }
};
