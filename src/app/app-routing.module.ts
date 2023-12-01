import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./shared-dashboard/pages/login/login.component";
import {RegistrationComponent} from "./admin-dashboard/pages/registration/registration.component";
import {ChangePasswordComponent} from "./shared-dashboard/pages/change-password/change-password.component";
import {ResetPasswordComponent} from "./shared-dashboard/pages/reset-password/reset-password.component";
import {CustomerListingComponent} from "./admin-dashboard/pages/customer-listing/customer-listing.component";
import {authGuard} from "./guards/auth-guard/auth.guard";
import {AccountsComponent} from "./customer-dashboard/pages/accounts/accounts.component";
import {adminGuard} from "./guards/admin-guard/admin.guard";
import {UpdatePasswordComponent} from "./shared-dashboard/pages/update-password/update-password.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent, canActivate:[adminGuard]},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'customer-listing', component: CustomerListingComponent, canActivate:[adminGuard]},
  {path: 'accounts', component:AccountsComponent, canActivate:[authGuard]},
  { path: 'update-password', component:UpdatePasswordComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
