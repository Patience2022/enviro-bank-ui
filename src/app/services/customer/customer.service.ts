import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CustomerDTO} from "../../shared-dashboard/DTOs/CustomerDTO";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = "http://localhost:8080/api/v1/customers"
  constructor(private http: HttpClient) {
  }

    public getAllCustomers(){
    return this.http.get<any>(this.baseUrl,
      { headers: new HttpHeaders().set('Content-Type','application/json')});
    }

    public updateCustomer(inputData: any, id:number){
    return this.http.put<any>(this.baseUrl+"/"+id,JSON.stringify(inputData),
      {headers: new HttpHeaders().set("Content-Type", "application/json")});
  }

  public getCustomerById(id:number){
    return this.http.get<any>(this.baseUrl+"/"+id,
      {headers: new HttpHeaders().set("Content-Type", "application/json")});
  }
    public registerCustomer(inputData:any){
    return this.http.post<any>(this.baseUrl, JSON.stringify(inputData),
      {headers: new HttpHeaders().set("Content-Type", "application/json")});
    }

    public findCustomerByUsernameOrEmail(data:string){
      return this.http.get<CustomerDTO>(this.baseUrl+"/find/"+data,
          {headers: new HttpHeaders().set("Content-Type", "application/json")});
    }

  updateDetails() {
    return sessionStorage.getItem("USERNAME")
  }
}
