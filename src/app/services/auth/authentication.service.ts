import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, pipe, Subject, tap} from "rxjs";
import {LoginResponse} from "../../shared-dashboard/DTOs/login-response";
import {A} from "@angular/cdk/keycodes";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private static readonly key:string="JWT_KEY";
  private static readonly role:string="USER_ROLE";
  private static readonly user:string="USERNAME";
  private static readonly user_id:string="user_id";
  private static readonly initials:string ="in";
  constructor(private http:HttpClient) {
  }
  baseUrl = "http://localhost:8080/api/v1/auth"

  get jwt():string{
    return sessionStorage.getItem(AuthenticationService.key) ?? '';
  }
  private set jwt(value:string){

    sessionStorage.setItem(AuthenticationService.key,value);
  }

  get id():string{
    return sessionStorage.getItem(AuthenticationService.user_id) ?? '';
  }
  private set id(value:string){
    sessionStorage.setItem(AuthenticationService.user_id,value);
  }

  get initials():string{
    return sessionStorage.getItem(AuthenticationService.initials) ?? '';
  }
  private set initials(value:string){
    sessionStorage.setItem(AuthenticationService.initials,value);
  }
  get role():string{
    return sessionStorage.getItem(AuthenticationService.role) ?? '';
  }
  private set role(value:string){
    sessionStorage.setItem(AuthenticationService.role,value);
  }

  get username():string{
    return sessionStorage.getItem(AuthenticationService.user) ?? '';
  }
  private set username(value:string){
    console.log(AuthenticationService.user,value)
    sessionStorage.setItem(AuthenticationService.user,value);
  }


  get isLoggedIn():boolean{
    return !!this.jwt;
  }

  public login(inputData:any):Observable<any>{
    return  this.http.post<LoginResponse>(this.baseUrl+"/login",JSON.stringify(inputData),
      { headers: new HttpHeaders().set('Content-Type','application/json')}).pipe(
        tap(r => this.jwt =r.accessToken),
        tap(r=>
        this.role =r.role),
      tap(r=>
        this.username =r.username),
      tap(r=>
        this.id =r.id),
      tap(r=> this.initials = r.initials)
    );
  }

  public resetPassword(inputData:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+"/reset-password",JSON.stringify(inputData),
      { headers: new HttpHeaders().set('Content-Type','application/json')});
  }

  public changePassword(inputData: any, token: string):Observable<any>{
    return  this.http.post(this.baseUrl+"/change-password?token="+token, JSON.stringify(inputData),
      {headers: new HttpHeaders().set('Content-Type','application/json')});
  }

  public logOut(){
    sessionStorage.removeItem(AuthenticationService.key);
    sessionStorage.removeItem(AuthenticationService.user);
    sessionStorage.removeItem(AuthenticationService.role);
    sessionStorage.removeItem(AuthenticationService.user_id);
    sessionStorage.removeItem(AuthenticationService.initials)
  }

  updatePassword(inputData: any) {
    return this.http.post<any>(this.baseUrl+"/update-password",JSON.stringify(inputData),
      { headers: new HttpHeaders().set('Content-Type','application/json')});
  }
}
