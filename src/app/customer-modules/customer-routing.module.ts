import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoreServicesComponent } from '../core/components/more-services/more-services.component';
import { AuthGuardService } from '../core/services/guards/auth-guard.service';
import { BusinessSubscriptionComponent } from './components/business-subscription/business-subscription.component';
import { CancelMyAccountComponent, CancelMySubscriptionComponent, ChangePasswordComponent, CompanyComponent, CorporateLifeHistoryComponent, EmployeesComponent, HomeComponent, MyAccountComponent, MyDocumentsComponent, MyInformationComponent, MySubscriptionComponent, NewsComponent, OffersComponent, OrderHistoryComponent, ServicesComponent } from './components';
import { OfferDetailComponent } from './components/offer-detail/offer-detail.component';
import { SubscriptionPlansComponent } from './components/subscription-plans/subscription-plans.component';
import { CustomerComponent } from './customer.component';
import { IndividualSubscriptionComponent } from './components/individual-subscription/individual-subscription.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { EmployeeSubscriptionComponent } from './components/employee-subscription/employee-subscription.component';
import { B2bSubscriptionComponent } from './components/b2b-subscription/b2b-subscription.component';
import { CompanyClientComponent } from './components/company-client/company-client.component';
import { NewsDetailsModalComponent } from '../core/components/news-details-modal/news-details-modal.component';
import { NewSubscriptionComponent } from './components/new-subscription/new-subscription.component';
import { IdeaBoxComponent } from './components/idea-box/idea-box.component';
const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate : [AuthGuardService]
      },
    ]
  },
  {
    path: 'offers',
    component: OffersComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'company',
    component: CompanyComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'services',
    component: MoreServicesComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'services-list',
    component: ServiceListComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'services-detail/:id',
    component: ServiceDetailComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'subscription-plans',
    component: SubscriptionPlansComponent,
    // canActivate : [AuthGuardService]
  },
  {
    path: 'moreservices',
    component: ServicesComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'individualsubscription/:id',
    component: IndividualSubscriptionComponent
  },
  {
    path: 'individualsubscription',
    component: IndividualSubscriptionComponent
  },
  {
    path: 'businesssubscription',
    component: BusinessSubscriptionComponent
  },
  {
    path: 'businesssubscription/:id',
    component: BusinessSubscriptionComponent
  },
  {
    path: 'newSubscription/:id',
    component: NewSubscriptionComponent
  },
  {
    path: 'myaccount',
    component: MyAccountComponent,
    canActivate : [AuthGuardService],
    children: [
      {
        path: 'profile',
        component: MyInformationComponent,
        canActivate : [AuthGuardService]
      },
      {
        path: 'subscriptions',
        component: MySubscriptionComponent,
        canActivate : [AuthGuardService]
      },
      {
        path: 'orderhistory',
        component: OrderHistoryComponent,
        canActivate : [AuthGuardService]
      },
      {
        path: 'corporatehistory',
        component: CorporateLifeHistoryComponent,
        canActivate : [AuthGuardService]
      },
      {
        path: 'cancelsubscription',
        component: CancelMySubscriptionComponent,
        canActivate : [AuthGuardService]
      },
      {
        path: 'documents',
        component: MyDocumentsComponent,
        canActivate : [AuthGuardService]
      },
      {
        path: 'news',
        component: NewsComponent,
        canActivate : [AuthGuardService]
      },
      {
        path: 'employees',
        component: EmployeesComponent,
        canActivate : [AuthGuardService]
      },
      {
        path: 'companyclient',
        component: CompanyClientComponent,
        canActivate : [AuthGuardService]
      },
      {
        path: 'ideaBox',
        component: IdeaBoxComponent,
        canActivate : [AuthGuardService]
      },
      {
        path: 'cancelaccount',
        component: CancelMyAccountComponent,
        canActivate : [AuthGuardService]
      },
      {
        path: 'changepassword',
        component: ChangePasswordComponent,
        canActivate : [AuthGuardService]
      }
    ]
  },
  {
    path: 'offer/:id',
    component: OfferDetailComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'employeesubscription/:id',
    component: EmployeeSubscriptionComponent
  },
  {
    path: 'b2bsubscription',
    component: B2bSubscriptionComponent
  },
  { path: '**', redirectTo: '/404' },
  { path: '', redirectTo: 'customer/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
