import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared-dashboard/pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "../material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {ToastrModule} from "ngx-toastr";
import { RegistrationComponent } from './admin-dashboard/pages/registration/registration.component';
import { ResetPasswordComponent } from './shared-dashboard/pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from './shared-dashboard/pages/change-password/change-password.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {JwtInterceptor} from "./shared-dashboard/interceptors/jwt-interceptor";
import { AdminComponent } from './admin-dashboard/pages/admin/admin.component';
import {HttpErrorInterceptor} from "./shared-dashboard/interceptors/HttpErrorInterceptor";
import { CustomerListingComponent } from './admin-dashboard/pages/customer-listing/customer-listing.component';
import { UpdateCustomerPopUpComponent } from './admin-dashboard/pages/update-customer-pop-up/update-customer-pop-up.component';
import { AccountsComponent } from './customer-dashboard/pages/accounts/accounts.component';
import { TransferComponent } from './shared-dashboard/pages/transfer/transfer.component';
import { UpdatePasswordComponent } from './shared-dashboard/pages/update-password/update-password.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import { UpdateProfileComponent } from './shared-dashboard/update-profile/update-profile.component';
import {MatTabsModule} from "@angular/material/tabs";
import { TransactionsComponent } from './transactions/transactions.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    AdminComponent,
    CustomerListingComponent,
    UpdateCustomerPopUpComponent,
    AccountsComponent,
    TransferComponent,
    UpdatePasswordComponent,
    NavBarComponent,
    UpdateProfileComponent,
    TransactionsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        // to be installed npm install ngx-toastr, used for traditional notifications
        ToastrModule.forRoot(),
        MatButtonModule,
        FormsModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule

    ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {provide:  HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true},
    {provide:  HTTP_INTERCEPTORS, useClass:HttpErrorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
