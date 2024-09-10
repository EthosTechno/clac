import { ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CoreRoutingModule } from './core-routing.module';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { LatestOfferComponent } from './components/latest-offer/latest-offer.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';
import { ServiceBannerComponent } from './components/service-banner/service-banner.component';
import { LatestServicesComponent } from './components/latest-services/latest-services.component';
import { OfferBannerComponent } from './components/offer-banner/offer-banner.component';
import { MoreServicesComponent } from './components/more-services/more-services.component';
import { SpinnerService } from './services/spinner.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptorService } from './interceptor/spinner-interceptor.service';
import { ErrorInterceptorService } from './interceptor/error-interceptor.service';
import { BaseService } from './utils/base.service';
import { Base64Service } from './utils/base64.service';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { FournotfourComponent } from './components/fournotfour/fournotfour.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { TranslateModule } from '@ngx-translate/core';
import { SwalService } from './helpers/swal.service';
import { CheckExpiredDirective } from './directives/expired.directive';
import { MustMatchDirective } from './directives/password.match.directive';
import { OfferDetailsModalComponent } from './components/offer-details-modal/offer-details-modal.component';
import { CorporateOfferDetailsModalComponent } from './components/corporate-offer-details-modal/corporate-offer-details-modal.component';
import { NewsDetailsModalComponent } from './components/news-details-modal/news-details-modal.component';
import { SwiperModule } from 'swiper/angular';
import {DropdownModule} from 'primeng/dropdown';
import { ServiceOrderComponent } from './components/service-order/service-order.component';
import { ContactUsDetailsComponent } from './components/contact-us-details/contact-us-details.component';
export const interceptorProviders =
  [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ];
  
@NgModule({
  declarations: [
    AccessDeniedComponent,
    // LoginComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    LatestOfferComponent,
    LatestNewsComponent,
    ServiceBannerComponent,
    LatestServicesComponent,
    OfferBannerComponent,
    MoreServicesComponent,
    FournotfourComponent,
    SelectLanguageComponent,
    CheckExpiredDirective,
    MustMatchDirective,
    OfferDetailsModalComponent,
    CorporateOfferDetailsModalComponent,
    NewsDetailsModalComponent,
    ServiceOrderComponent,
    ContactUsDetailsComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    TranslateModule,
    SwiperModule,
    DropdownModule,
    FormsModule
  ],
  providers:[SpinnerService,
    AuthGuardService,
    interceptorProviders,
    BaseService,
    Base64Service,
    SwalService],
    exports: [HeaderComponent, FooterComponent,BannerComponent,LatestOfferComponent,LatestNewsComponent,OfferBannerComponent,
      ServiceBannerComponent,LatestServicesComponent,MoreServicesComponent,TranslateModule,CheckExpiredDirective,MustMatchDirective,OfferDetailsModalComponent,CorporateOfferDetailsModalComponent,ServiceOrderComponent],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule
    };
  }
 }
