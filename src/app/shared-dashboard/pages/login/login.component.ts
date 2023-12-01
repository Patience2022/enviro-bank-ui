import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  responseData:any;
  constructor(private builder:FormBuilder, private toaster:ToastrService, private service:AuthenticationService, private router: Router) {
  }

  loginForm = this.builder.group({
    usernameOrEmail:this.builder.control('', Validators.required),
    password:this.builder.control('', Validators.required)
  })


  login(){
    if(this.loginForm.valid){
      this.service.login(this.loginForm.value).subscribe(res =>{
        this.toaster.success("Logged In successfully")
        this.responseData =res;
        if(sessionStorage.getItem("USER_ROLE")=="[ROLE_Customer]")
        {
          this.router.navigateByUrl("/accounts")}
        else{
          this.router.navigateByUrl("/customer-listing")}
      })
    }
    else{
      this.toaster.warning("Please enter required fields");
    }
  }

}
