import {CanActivateFn, Router} from '@angular/router';
import {Inject} from "@angular/core";


export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem("JWT_KEY");
  const router = Inject(Router);
  // @ts-ignore
  if(token){
    return true;
  }
  else {
    router.navigate(['login'])
    return false;
  }
};
