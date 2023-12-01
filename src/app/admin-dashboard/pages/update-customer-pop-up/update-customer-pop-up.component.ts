import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CustomerService} from "../../../services/customer/customer.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomerDTO} from "../../../shared-dashboard/DTOs/CustomerDTO";



@Component({
  selector: 'app-update-customer-pop-up',
  templateUrl: './update-customer-pop-up.component.html',
  styleUrls: ['./update-customer-pop-up.component.css']
})
export class UpdateCustomerPopUpComponent implements OnInit {
  hide = true
  id: number = 0
  admin = false;
  customer = true;
  constructor(private builder: FormBuilder,
              private toaster: ToastrService, private service: CustomerService,
              @Inject(MAT_DIALOG_DATA) public data: CustomerDTO,
              private dialog: MatDialogRef<UpdateCustomerPopUpComponent>) {
  }

  ngOnInit(): void {

    if (sessionStorage.getItem("USER_ROLE") !== '[ROLE_CUSTOMER]') {
      this.hide = false;
    }
    if (this.data) {
      this.updateUserForm.patchValue({
        id: this.data.id,
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        identityNumber: this.data.identityNumber,
        phoneNumber: this.data.phoneNumber,
        email: this.data.email,
        locked: this.data.locked

      })
      this.id = this.data.id
    }


  }

  updateUserForm = this.builder.group({
    id: this.builder.control(0),
    firstName: this.builder.control(''),
    lastName: this.builder.control(''),
    identityNumber: this.builder.control(''),
    phoneNumber: this.builder.control(''),
    email: this.builder.control(''),
    locked: this.builder.control(false)
  })

  updateUser() {
    if (this.updateUserForm.valid) {
      this.service.updateCustomer(this.updateUserForm.value, this.id).subscribe(response => {
        this.toaster.success("Client details updated successfully");
      })
      this.dialog.close()
    } else {
      this.toaster.warning("Please fill in all required fields");
    }
  }


}
