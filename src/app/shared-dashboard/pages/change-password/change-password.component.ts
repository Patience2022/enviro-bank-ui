import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/auth/authentication.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {query} from "@angular/animations";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  responseData:any
  public token:string='';
  constructor(private builder:FormBuilder, private service: AuthenticationService,
              private toaster: ToastrService, private route:ActivatedRoute, private router:Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParam =>{
      this.token = queryParam['token'];
    })
  }
  changePasswordForm = this.builder.group(
    { newPassword: this.builder.control('', Validators.required)}
  )

  changePassword(){
    if (this.changePasswordForm.valid){

      this.service.changePassword(this.changePasswordForm.value, this.token).subscribe(
        response=>{
          this.toaster.success("Your password was successfully updated")});
          this.router.navigateByUrl("/login")
    }
    else {
      this.toaster.warning("Please enter a valid password")
    }
  }


}
