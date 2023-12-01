import {Component, Inject, Injectable, Input, OnInit} from '@angular/core';
import {TransactionsService} from "../services/transactions/transactions.service";
import {TransactionDTO} from "../shared-dashboard/DTOs/TransactionDTO";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Page} from "../shared-dashboard/DTOs/Page.";
import {AccountDto} from "../shared-dashboard/DTOs/AccountDto";
import {AccountService} from "../services/account/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit{
  @Input()transactions: TransactionDTO[] =[]
  accountType:string = '';
  accountPage!: Page<AccountDto>;
  @Input() accountNumber:any;
  constructor(private transactionService:TransactionsService,
              private accounts:AccountService, private router :Router) {
  }
  ngOnInit(): void {
    console.log("Account number of child is "+this.accountNumber)
    console.log((sessionStorage.getItem("USER_ROLE")));
    const id = sessionStorage.getItem('user_id') ?? '';
    if (sessionStorage.getItem("USER_ROLE") == '[ROLE_Customer]') {
      //    this.accounts.getUserAccounts().subscribe(res=>
      //   {
      //     this.accountPage = res
      //   })
      // }
      // else{
      //   this.accounts.getUserAccounts().subscribe(res=>{
      //     this.accountPage = res
      //   })
      // }
      /*if (this.data) {
        this.accountType = this.data.accountType
        this.transactionService.getAccountTransactions(this.data.accountNumber).subscribe(
          res => {
            this.transactions = res
            this.accountPage = this.data.accountPage

          }
        )
      }*/


/*
      this.transactionService.getAccountTransactions(this.accountNumber).subscribe(
        res => {
          this.transactions = res
        console.log(this.transactions)

        }
      )
*/

    }

    // getAccountTransactions(){
    //   if(this.transactionList){
    //     this.transactions = this.transactionList
    //   }
    // }


  }
  close(){
    this.router.navigateByUrl("/accounts")
  }
}
