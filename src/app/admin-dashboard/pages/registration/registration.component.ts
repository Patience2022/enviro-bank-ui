import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {CustomerService} from "../../../services/customer/customer.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {


  constructor(private builder:FormBuilder, private toaster:ToastrService,private service: CustomerService,
              private router:Router) {
  }
  registrationForm = this.builder.group({
    firstName:this.builder.control("",
      Validators.compose([Validators.required])),
    lastName:this.builder.control("",
      Validators.compose([Validators.required])),
    identityNumber:this.builder.control("",
      Validators.compose([Validators.required])),
    phoneNumber:this.builder.control("",
      Validators.compose([Validators.required])),
    email:this.builder.control("",
      Validators.compose([Validators.required, Validators.email])),
    userRolesName:this.builder.control("Customer",Validators.required),
    userName:this.builder.control("",Validators.required),
  })
  responseData:any
errorMessage:any
  proceedToRegistration() {
    if(this.registrationForm.valid){
      this.service.registerCustomer(this.registrationForm.value).subscribe(response=>{
        this.responseData =response}, error => {
        this.errorMessage =error

      });if(this.errorMessage==null){
      this.toaster.success("Registered successfully")}
      else {
        console.log(this.errorMessage.message.toString())
        this.toaster.error(this.errorMessage).message.toString()
      }
      this.router.navigateByUrl("/customer-listing");
    }

    else {
      this.toaster.warning("Please fill in all required fields");
    }
  }

  back() {
    this.router.navigateByUrl("/customer-listing")
  }
}
