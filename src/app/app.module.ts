import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth-module/auth.module';
import { CoreModule } from './core/core.module';
import { MyAccountComponent } from './customer-modules/components';
import { CustomerModule } from './customer-modules/customer.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { environment } from 'src/environments/environment';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    MyAccountComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    CustomerModule,
    AuthModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },],
  bootstrap: [AppComponent],
  exports: [TranslateModule, NgxMaskModule],
})
export class AppModule {
  constructor(translate: TranslateService) {
    if(environment.production){
      translate.currentLoader["prefix"] = '../'+environment.baseURL + translate.currentLoader["prefix"]
    }
    
    translate.addLangs(['en', 'fr']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|fr/) ? browserLang : 'fr');
  }
}
