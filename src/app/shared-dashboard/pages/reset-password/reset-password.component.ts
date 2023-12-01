import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  responseData:any
  constructor(private toaster:ToastrService, private service: AuthenticationService, private builder:FormBuilder, private router:Router) {
  }

  resetPasswordForm = this.builder.group(
    {emailOrUsername:this.builder.control('', Validators.required)})

  resetPassword(){
    if (this.resetPasswordForm.valid){
      this.service.resetPassword(this.resetPasswordForm.value).subscribe(res=>{
        this.responseData=res;
        this.toaster.success("Reset email sent to your email address");
        console.log(res);
        })}
    else {
      this.toaster.warning("Please enter username or email");
    }
  }

}
