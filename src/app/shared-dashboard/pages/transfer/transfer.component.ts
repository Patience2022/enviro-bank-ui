import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AccountService} from "../../../services/account/account.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Page} from "../../DTOs/Page.";
import {AccountDto} from "../../DTOs/AccountDto";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit{
  accountPage!: Page<AccountDto>;
  accounts: AccountDto[] =[]
  froms!:string

  constructor(private builder: FormBuilder, private service: AccountService, private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: string, private dialog: MatDialogRef<TransferComponent>) {
  }

  ngOnInit(): void {
    const userRole = sessionStorage.getItem("USER_ROLE");
    if (userRole === '[ROLE_CUSTOMER]') {
      this.service.getUserAccounts().subscribe(res => {
        this.accountPage = res
        if (this.accountPage != null) {
          this.accounts = this.accountPage?.content
          if (this.data != this.accounts[0].accountNumber) {
            this.transferForm.setValue({
              fromAccountNumber: this.data, toAccountNumber: this.accounts[0].accountNumber,
              transferAmount: 0, reference: ''
            })
          } else {
            this.transferForm.setValue({
              fromAccountNumber: this.data, toAccountNumber: this.accounts[1].accountNumber,
              transferAmount: 0, reference: ''
            })
          }
        }
      })
    } else {
      this.transferForm.setValue({
        fromAccountNumber: this.data, toAccountNumber: "", transferAmount: 0, reference: ''
      })
    }


  }

  transferForm = this.builder.group({
    fromAccountNumber: this.builder.control(''),
    toAccountNumber: this.builder.control('', Validators.required),
    transferAmount: this.builder.control(0, Validators.required),
    reference: this.builder.control('')
  })

  transfer() {
    if (this.transferForm.valid) {
      this.service.transfer(this.transferForm.value).subscribe(res => {
        this.toastr.success("Transferred successfully");
        this.dialog.close()
      });
    } else {
      this.toastr.warning("Please enter correct information");
    }
  }

  close() {
    this.dialog.close()
  }
}
