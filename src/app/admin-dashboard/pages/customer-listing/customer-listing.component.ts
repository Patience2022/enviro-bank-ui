import {Component,  OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CustomerService} from "../../../services/customer/customer.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

import {UpdateCustomerPopUpComponent} from "../update-customer-pop-up/update-customer-pop-up.component";
import {CustomerDTO} from "../../../shared-dashboard/DTOs/CustomerDTO";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.css'],
})
export class CustomerListingComponent implements OnInit {
    customerList: any
    dataSource: any
    @ViewChild(MatPaginator) paginator !: MatPaginator;
    @ViewChild(MatSort) sort !: MatSort;
    customer: CustomerDTO | undefined
    constructor(private route: Router, private service: CustomerService, private dialog: MatDialog
    ) {

    }

    ngOnInit(): void {
        this.getAllActiveUsers();
    }

    getAllActiveUsers() {
        this.service.getAllCustomers().subscribe(response => {
            this.customerList = response;
            this.dataSource = new MatTableDataSource(this.customerList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    displayedColumns: string[] = ['firstName', 'lastName', 'email', 'numberOfAccounts', 'action'];

    updateCustomerDetails(email: any) {
      if(email == null){
        email = sessionStorage.getItem("USERNAME")
      }
        this.service.findCustomerByUsernameOrEmail(email).subscribe(
            res => {
                this.customer = res
            })
        if (this.customer) {
            const popup = this.dialog.open(UpdateCustomerPopUpComponent, {
                enterAnimationDuration: '1000ms',
                exitAnimationDuration: '500ms',
                width: '50%',
                data: {
                  id:this.customer.id,
                  firstName:this.customer.firstName,
                  lastName: this.customer.lastName,
                  identityNumber: this.customer.identityNumber,
                  phoneNumber: this.customer.phoneNumber,
                  email: this.customer.email,
                  locked: this.customer.locked
                }
            })
            popup.afterClosed().subscribe(res => {
                this.getAllActiveUsers()
            })

        }
    }
updateDetails(){
      this.updateCustomerDetails(this.service.updateDetails())
}

}
