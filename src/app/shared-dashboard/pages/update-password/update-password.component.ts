import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {ToastrService} from "ngx-toastr";
import {PasswordValidator} from "../../../services/validators/password.validator";


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  private responseData: any;

constructor(private builder: FormBuilder, private service: AuthenticationService, private toastr:ToastrService) {
}


  updatePasswordForm = this.builder.group({
    newPassword:['',Validators.required],
    oldPassword:['',Validators.required],
    confirmationPassword:['', Validators.required]}, {validator: PasswordValidator})


  updatePassword() {
    if(this.updatePasswordForm.valid){
      this.service.updatePassword(this.updatePasswordForm.value).subscribe(res=> {
        this.responseData = res
        this.toastr.success("Password was successfully changed")
      })
    }
    else{
      this.toastr.warning("Enter all required fields");
    }
  }
}
