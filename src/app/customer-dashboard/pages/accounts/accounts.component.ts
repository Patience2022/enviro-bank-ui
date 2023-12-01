import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "../../../services/account/account.service";
import {AccountDto} from "../../../shared-dashboard/DTOs/AccountDto";
import {Page} from "../../../shared-dashboard/DTOs/Page.";
import {MatDialog} from "@angular/material/dialog";
import {TransferComponent} from "../../../shared-dashboard/pages/transfer/transfer.component";
import {TransactionsService} from "../../../services/transactions/transactions.service";
import {TransactionsComponent} from "../../../transactions/transactions.component";
import {TransactionDTO} from "../../../shared-dashboard/DTOs/TransactionDTO";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{
  @ViewChild(TransactionsComponent) view!: TransactionsComponent

  accountPage!: Page<AccountDto>;
  transactionsDisplayed=false;
    hide=true
  accountTransactions: TransactionDTO[] =[]
  accountNumber:string ='';
  accountType = '';


  constructor(private service:AccountService, private matDialog:MatDialog,private transactionService:TransactionsService) {

  }

 getAccountNumber(accountNumber:string):string{
    return accountNumber
  }
  getAccounts(){
    return this.service.getUserAccounts().subscribe(res=>{
      this.accountPage =res
    });
  }
  ngOnInit(): void {

    this.getAccounts()
  }

  transfer(code: string){

    const popup =this.matDialog.open(TransferComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'500ms',
      width:'50%',
      data:code
    })
    popup.afterClosed().subscribe(res=>{
      this.getAccounts()
    });
  }

/*
  getAccountTransactions(accountNumber: string, accountType:string) {
    this.hide =true;
        const popup =this.matDialog.open(TransactionsComponent,{
          enterAnimationDuration:'1000ms',
          exitAnimationDuration:'500ms',
          width:'50%',
          data:{
               accountNumber:accountNumber,
                accountType:accountType,
                accounts:this.accountPage
          }
        })
        popup.afterClosed().subscribe(res=>{
          this.getAccounts()
        });
        this.accountNumber =accountNumber
      }

*/
  getAccountTransactions(accountNumber: string){
    this.transactionService.getAccountTransactions(accountNumber).subscribe(
      res => {
        this.accountTransactions = res
        this.accountNumber;
        this.transactionsDisplayed = true

      }
    )
  }

  close(){

  }

}
