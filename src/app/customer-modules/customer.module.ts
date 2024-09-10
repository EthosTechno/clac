import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CompanyComponent, HomeComponent, OffersComponent, ServicesComponent,MyInformationComponent,MySubscriptionComponent
 ,OrderHistoryComponent,CorporateLifeHistoryComponent,CancelMySubscriptionComponent,MyDocumentsComponent,NewsComponent,EmployeesComponent,
 CancelMyAccountComponent} from './components';
import { CoreModule } from '../core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { SubscriptionPlansComponent } from './components/subscription-plans/subscription-plans.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OfferDetailComponent } from './components/offer-detail/offer-detail.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { IndividualSubscriptionComponent } from './components/individual-subscription/individual-subscription.component';
import { BusinessSubscriptionComponent } from './components/business-subscription/business-subscription.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { SwiperModule } from 'swiper/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EmployeeSubscriptionComponent } from './components/employee-subscription/employee-subscription.component';
import {DropdownModule} from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { CardPaymentComponent } from './components/card-payment/card-payment.component';
import { B2bSubscriptionComponent } from './components/b2b-subscription/b2b-subscription.component';
import { CompanyClientComponent } from './components/company-client/company-client.component';
import { NewSubscriptionComponent } from './components/new-subscription/new-subscription.component';
import { IdeaBoxComponent } from './components/idea-box/idea-box.component';



const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    CustomerComponent,
    HomeComponent,
    OffersComponent,
    CompanyComponent,
    ServicesComponent,
    MyInformationComponent,
    MySubscriptionComponent,
    OrderHistoryComponent,
    CorporateLifeHistoryComponent,
    CancelMySubscriptionComponent,
    MyDocumentsComponent,
    NewsComponent,
    EmployeesComponent,
    CancelMyAccountComponent,
    SubscriptionPlansComponent,
    OfferDetailComponent,
    ChangePasswordComponent,
    IndividualSubscriptionComponent,
    BusinessSubscriptionComponent,
    ServiceListComponent,
    ServiceDetailComponent,
    EmployeeSubscriptionComponent,
    CardPaymentComponent,
    B2bSubscriptionComponent,
    CompanyClientComponent,
    IdeaBoxComponent,
    
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CoreModule,
    TranslateModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    CarouselModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
    NgxPaginationModule,
    SwiperModule,
    TableModule,
    DropdownModule
  ],
})
export class CustomerModule {
  
 }
