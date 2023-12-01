import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TransactionDTO} from "../../shared-dashboard/DTOs/TransactionDTO";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  baseUrl = "http://localhost:8080/api/v1/transactions"
  constructor(private http: HttpClient) { }

  public getAccountTransactions(accountNumber:string){
    return this.http.get<TransactionDTO[]>(this.baseUrl+"/account-transactions?accountNumber="+accountNumber,
      {headers: new HttpHeaders().set('Content-Type', "application/json")});
  }
}
