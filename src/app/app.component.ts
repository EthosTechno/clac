import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Base64Service } from './core/services/base64-service.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  //#region Variable Declaration
  title = 'clacdesdoigts';
  strikeCheckout: any = null;
  stripeKey : string = 'pk_test_51InKC6SEdhE1kSSow3tyllKc5DhBneIIO8slat3d97Cspx8X8GniZdNbsmLNSSXVE03KubZWErpJS7c610LismgF00vRWZPU3v';
  //#endregion

  

  //#region Constructor
  /**
   * @param translate 
   */
  constructor(public translate: TranslateService) {
  
    let selectedLanguage = localStorage.getItem("lang");
    if (!selectedLanguage) {
      this.translate.use('en');
      localStorage.setItem("lang",'en')
    } else {
      this.translate.use(selectedLanguage)
    }
  }
  //#endregion

  //#region Methods

  /**
   * The method which will be called after constructor
   */
  ngOnInit() {  
  
    //this.stripePaymentGateway();
    ////// REMOVE THE CODE //////////    
    // let userdata = 'jzbtRuT9TvSmRWwYS4KzXDN5XDaYXYxARDTmGvXQXuT8TL+VSoA8TvrZSoPOHixO7LGVSibtjFeECoUtCuPvCYQZ7ub/So1ATvrZKoPOHixvCoUzHiNZ7ubdaLlLHomAiYAVSo3ATvrZHMxQaDrg75FzXzqzXDF/Xvn/X4NYpvIdXDngaMbgRLA8RykYXoxAGLFQXvnqX5n6GvGIRoKzX4S5GDngCDe9XYAcCEr/HEeETZdZ3WlORoqZpZbAjwtrSI3vHwltyIA+jIIm4LAbaQA/wv+vKQIYyoVdoURDyvI/RiA0aUtDy4RbHAAqoI3+XAAwwiAGxW394wxvXIQzwLmHxFAq4LtGXF1DyiGbC4+rSA3+HwltyIbZCixdRF3p3UASyEeAKQA5yo1o3UAiCMGbHLlto+a1aLUSwEbXCwPQo+c0aW+UKLPZ+QRdSIX1HLTzXWAXKQt6SYQPCoUijWmSXLmQo+3ICFAfCYAZxFTY44b8HWb/C6+cCIb/yoA6HoUixvebHLlq4LtxXFPwS5+pHIIm4FG0CW+TKoAsHIwz4IxxXIPfoi3GHASP7LV/RQXzGomWHU+X3vRy7o85+FRv4+eopMGmpF8q3veqXUGOGLPUaIxTRwwZ2K==';
    // let token    = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGU2YTQyMDgzMDc2M2RlZDIxNjM0MCIsIm5hbWUiOiJBbmtpdGNtYXJpeCIsImVtYWlsIjoiYW5raXRrLmNtYXJpeEBnbWFpbC5jb20iLCJwcm9maWxlX2ltYWdlIjoibDB6M2lhbnouanBnIiwiaWF0IjoxNjQ0NTc5NjI1LCJleHAiOjE2NDQ2NjYwMjV9.kngC25lFhULv6R-k3TFcMPV8sq8K8v0x0Sk6nErDHeE';     
    // localStorage.setItem('userdata', userdata);
    // localStorage.setItem('token', token);
    /////////////////////////////////
    
    //this.loadScript();

    // #region Commented code for stripe payment
    // this.stripePaymentGateway();
    // setTimeout(() => {
    //   this.checkout(500);
    // }, 5000);
    //  #endregion
    //  $(function () {
    //   $('[data-toggle="tooltip"]').tooltip()
    // })
  
  }

  checkout(amount) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51InKC6SEdhE1kSSow3tyllKc5DhBneIIO8slat3d97Cspx8X8GniZdNbsmLNSSXVE03KubZWErpJS7c610LismgF00vRWZPU3v',
      locale: 'auto',
      token: function (stripeToken: any) {
        alert('Stripe token generated!');
      }
    });
  
    strikeCheckout.open({
      name: 'RemoteStack',
      description: 'Payment widgets',
      amount: amount * 100
    });
  }
  
  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_12239293949ksdfksdjkfj1232q3jkjssdfjk',
          locale: 'auto',
          token: function (token: any) {
            alert('Payment via stripe successfull!');
          }
        });
      }        
      window.document.body.appendChild(scr);
    }
  }

  /**
   * load script for front app
   */
  loadScript() {
    let chatScript = document.createElement("script");
    chatScript.type = "text/javascript";
    chatScript.src = "https://chat-assets.frontapp.com/v1/chat.bundle.js?chatId=9005c3fe74aa6dd5c4774b5aed9b6c8e";
    document.body.appendChild(chatScript);

    setTimeout(() => {
      let chatScript1 = document.createElement("script");
      chatScript1.type = "text/javascript";
      chatScript1.src = "assets/js/frontApp.js";
      document.body.appendChild(chatScript1);
    }, 100);
  }

   //#region  Commented code for future use

  // stripePaymentGateway() {
  //   var self = this;
  //   if (!window.document.getElementById('stripe-script')) {
  //     const script = window.document.createElement("script");
  //     script.id = "stripe-script";
  //     script.type = "text/javascript";
  //     script.src = 'https://checkout.stripe.com/checkout.js';
  //     script.onload = () => {
  //       self.strikeCheckout = (<any>window).StripeCheckout.configure({
  //         key: self.stripeKey,
  //         locale: 'auto',
  //         token: function (stripeToken: any) {
  //           //self.toastrService.success("Payment has been successfull!");
  //         }
  //       });
  //     }
  //     window.document.body.appendChild(script);
  //   }
  // }


  // checkout(amount: any) {
  //   let userdata = localStorage.getItem('userdata');
  //   let userID: any;
  //   if (userdata) {
  //     userID = JSON.parse(Base64Service.decode(userdata)).id;
  //   }
  //   let self = this;
  //   const paymentHandler = (<any>window).StripeCheckout.configure({
  //     key: self.stripeKey,
  //     locale: 'auto',
  //     token: function (stripeToken: any) {
  //       var paymentData = {
  //         StripeEmail: stripeToken.email,
  //         StripeToken: stripeToken.id,
  //         LoggedInUserId: userID,
  //         OrderInvoiceId: 400,
  //         Amount: amount
  //       }
  //     }
  //   });

  //   paymentHandler.open({
  //     name: 'Clac',
  //     description: '',
  //     amount: amount * 100
  //   });
  // }

//#endregion

  //#endregion
}
