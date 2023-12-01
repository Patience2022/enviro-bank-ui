import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/auth/authentication.service";
import {Router} from "@angular/router";
import {CustomerService} from "../services/customer/customer.service";
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  initials = sessionStorage.getItem("in")??"EB"

  ngOnInit(): void {

  }
  constructor(private service: AuthenticationService, private router:Router, private customer:CustomerService) {

  }
  logOut() {
    this.service.logOut()
    this.router.navigateByUrl("/login")
  }

  updateDetails(){

      this.customer.updateDetails()

  }



}
