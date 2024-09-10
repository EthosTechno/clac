import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ContactComponent } from './contact/contact.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CoreModule } from '../core/core.module';
import { NewSubscriptionComponent } from '../customer-modules/components/new-subscription/new-subscription.component';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ContactComponent,
    ResetPasswordComponent,
    NewSubscriptionComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule,
    FormsModule,
    CoreModule
  ]
})
export class AuthModule { }
