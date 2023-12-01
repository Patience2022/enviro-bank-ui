import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthenticationService} from "../../services/auth/authentication.service";
import {ToastrService} from "ngx-toastr";
import {CustomErrorResponse} from "../DTOs/customErrorResponse";


@Injectable(
)
export class HttpErrorInterceptor implements HttpInterceptor{

  constructor(private service: AuthenticationService, private toastr:ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse)=>{
        this.toastr.error(error.error.date+'\n   '+
          error.error.errorMessage+'\n '+error.error.errorDetails)
      return throwError(error.error);
      })
    );
  }


}
