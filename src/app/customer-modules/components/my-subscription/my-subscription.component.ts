import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { MySusbcriptionModel, ResponseModel } from 'src/app/core/models';
import { UserService } from '../../api.services';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { Base64Service } from '../../../core/services/base64-service.service';

@Component({
  selector: 'app-my-subscription',
  templateUrl: './my-subscription.component.html',
  styleUrls: ['./my-subscription.component.scss']
})
export class MySubscriptionComponent implements OnInit {

  constant: Constant = new Constant();
  renewSubscription: any;
  card: any;
  error: string;
  stripeToken: any;
  stripe: any;
  userDetail: {};
  role: any;
  user_subscription_id: any;
  subscription_status: any;
  //#endregion

  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;
  mySusbcriptionModel: MySusbcriptionModel = new MySusbcriptionModel();
  @ViewChild('ModalClose') ModalClose: ElementRef;
  SubscriptionSummary: any;

  //#region constructor

  constructor(private userService: UserService, private swalService: SwalService, private cd: ChangeDetectorRef, private stripeService: AngularStripeService) { }

  //#region Methods
  ngOnInit(): void {

    this.userDetail = {};
    var userdata = JSON.parse(Base64Service.decode(localStorage.getItem('userdata')));
    this.role = userdata.active_role;
    this.user_subscription_id = userdata.user_subscription_id;
    this.subscription_status = userdata.subscription_status;

    this.getPlanSummary();
    this.getPlanDetails();
  }

  ngAfterViewInit() {
    this.stripeService.setPublishableKey('pk_test_51I44QjGgga2GK8PR1QFsEOggpWTjpv7U0GW7oolfkoOsIJ9Xw5NP9nwQfNAGNZermOJzQBBQcd4rhxozWzQS9BMJ00NYDbu3M4').then(
      stripe => {
        this.stripe = stripe;
        const elements = stripe.elements();
        this.card = elements.create('card');
        this.card.mount(this.cardInfo.nativeElement);
      });
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await this.stripe.createToken(this.card);
    if (token) {
      this.stripeToken = token.id
      this.savePaymentDetail();
    } else {
      this.error = error.message
      this.cd.detectChanges();
      console.log('Error:', error);
    }
  }


  /**
   * The methods to save the data of the payment related information
   */
  savePaymentDetail() {

    var reqData = {
      subscription_id: this.renewSubscription.subscription_id,
      subscription_plan_id: this.renewSubscription.subscription_plan_id,
      amount: this.renewSubscription.amount,
      stripeToken: this.stripeToken
    }

    this.userService.SubscriptionPlanUpdate(reqData, 'renew-subscription').subscribe((response) => {
      if (response.success) {
        this.ModalClose.nativeElement.click();
        var userdata = JSON.parse(Base64Service.decode(localStorage.getItem('userdata')));
        userdata.subscription_status = true;
        var userDetail = JSON.stringify(userdata)
        var encodedUserDetails = Base64Service.encode(userDetail);
        localStorage.setItem("userdata", encodedUserDetails);
        this.swalService.success(this.constant.successTitle, response.message, true);
        this.ngOnInit();
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }


  getPlanDetails() {
    this.userService.getSubscriptionPlanDetail('renew-subscription-plan-detail').subscribe((response: ResponseModel) => {
      if (response.success) {
        this.renewSubscription = response.data;
        console.log("this.renewSubscription", this.renewSubscription)
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  getPlanSummary() {
    this.userService.getSubscriptionPlanSummary('subscription-history').subscribe((response) => {


      if (response.success) {
        this.SubscriptionSummary = response.data;
        console.log(" this.SubscriptionSummary", this.SubscriptionSummary);

      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }
  //#endregion
}
