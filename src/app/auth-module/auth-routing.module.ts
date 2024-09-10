import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ContactComponent } from './contact/contact.component';
import { SubscriptionPlansComponent } from '../customer-modules/components/subscription-plans/subscription-plans.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewSubscriptionComponent } from '../customer-modules/components/new-subscription/new-subscription.component';
const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: 'newSubscription/:id',
      component: NewSubscriptionComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'forgotpassword',
      component: ForgotPasswordComponent
    },
    {
      path: 'resetpassword/:code',
      component: ResetPasswordComponent
    },
    {
      path: 'contact',
      component: ContactComponent
    },  
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
