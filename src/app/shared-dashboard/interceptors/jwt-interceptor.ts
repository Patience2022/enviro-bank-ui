import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "../../services/auth/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  constructor(private service: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = this.service.isLoggedIn;
    const isToServer = req.url.startsWith("http://localhost:8080/api");

    if(isLoggedIn && isToServer){
      req = req.clone({
        setHeaders: {Authorization:`Bearer ${this.service.jwt}`}
      });
    }
    return next.handle(req);
  }


}
