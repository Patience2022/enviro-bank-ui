import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {Authorization} from "../guards/auth-guard/authorization";


const adminRoutes:Authorization[] =[
  {
    path:'',
    redirectTo: 'customer-listing',
    pathMatch: 'full',
  },
  {

  }
]

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminDashboardModule { }
