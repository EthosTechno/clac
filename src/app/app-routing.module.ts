import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSubscriptionComponent } from './customer-modules/components/new-subscription/new-subscription.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
},
{
  path: 'customer',
  loadChildren: () => import('./customer-modules/customer.module').then(mod => mod.CustomerModule)
},
{
  path: '',
  loadChildren: () => import('./auth-module/auth.module').then(mod => mod.AuthModule)
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
