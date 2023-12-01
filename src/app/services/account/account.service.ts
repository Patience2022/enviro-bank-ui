import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AccountDto} from "../../shared-dashboard/DTOs/AccountDto";

import {Page} from "../../shared-dashboard/DTOs/Page.";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  id:string = sessionStorage.getItem('user_id')??'';
  baseUrl = "http://localhost:8080/api/v1/accounts"
  constructor(private http:HttpClient) { }

  public getUserAccounts(){

  return this.http.get<Page<AccountDto>>(this.baseUrl+"?id="+this.id,
    {headers: new HttpHeaders().set('Content-Type', "application/json")})
  }
  public transfer(inputData:any){
    return this.http.post<any>(this.baseUrl+'/transfer', JSON.stringify(inputData),
      {headers: new HttpHeaders().set('Content-Type', 'application/json')})
  }


}
