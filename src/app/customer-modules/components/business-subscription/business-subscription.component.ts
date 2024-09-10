import { Component, Input, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Stepper from 'bs-stepper';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { BusinessSubModel } from 'src/app/core/models/BusinessSubscription/businessSub.model';
import { BusinessSubService } from '../../api.services/businessSubscription/businessSub.service';
import { ResponseModel } from 'src/app/core/models';
import { NgForm } from "@angular/forms"
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service'
import { Token } from '@angular/compiler';
declare var $: any;
@Component({
  selector: 'app-business-subscription',
  templateUrl: './business-subscription.component.html',
  styleUrls: ['./business-subscription.component.scss']
})
export class BusinessSubscriptionComponent implements OnInit, AfterViewInit, OnDestroy {
  businessSub_id: any;
  @Input() subscription_id: any;
  subscription_plan_id: any;

  businessSubModel: BusinessSubModel = new BusinessSubModel();
  constant: Constant = new Constant();
  businessSubDetailData: any;

  private stepper: Stepper;
  basicAmount: any;
  totalAmount: any;
  url = 'http://123.201.20.186/clac-test-front/#/customer/employeesubscription/'

  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;
  stripe;
  loading = false;
  confirmation;

  card: any;
  //cardHandler = this.onChange.bind(this);
  error: string;

  stripeToken: any;
  bodMinDate: string;
  constructor(private route: ActivatedRoute,
    private BusinessSubService: BusinessSubService,
    private swalService: SwalService,
    private router: Router,
    public translate: TranslateService, private cd: ChangeDetectorRef,
    private stripeService: AngularStripeService) { }

  ngAfterViewInit() {
    this.stripeService.setPublishableKey('pk_test_51I44QjGgga2GK8PR1QFsEOggpWTjpv7U0GW7oolfkoOsIJ9Xw5NP9nwQfNAGNZermOJzQBBQcd4rhxozWzQS9BMJ00NYDbu3M4').then(
      stripe => {
        this.stripe = stripe;
        const elements = stripe.elements();
        this.card = elements.create('card');
        this.card.mount(this.cardInfo.nativeElement);
        //this.card.addEventListener('change', this.cardHandler);
      });
  }

  ngOnDestroy() {
    //this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }
  async onSubmit(form: NgForm) {
    const { token, error } = await this.stripe.createToken(this.card);
    if (token) {
      this.stripeToken = token.id
      this.next();
    } else {
      this.error = error.message
      this.cd.detectChanges();
      console.log('Error:', error);
    }
  }

  ngOnInit(): void {

    var yearMS = 365 * (1000 * 60 * 60 * 24); // 365 days
    var now = new Date().getTime();
    var maxDobMS = now - (16 * yearMS);
    this.bodMinDate = new Date(maxDobMS).toISOString().slice(0, 10)

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
    this.getBusinessSub();
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  previous() {
    this.stepper.previous();
  }

  next() {
    this.stepper.next();
  }

  getBusinessSub() {

    this.businessSub_id = this.route.snapshot.params?.['id'];

    if (this.businessSub_id) {
      this.BusinessSubService.getbusinessSubDetail("subscription/plan/" + this.businessSub_id).subscribe((response: ResponseModel) => {
        if (response.success) {
          this.businessSubDetailData = response.data[0];
          this.basicAmount = this.businessSubDetailData.amount;
          let taxAmount = Number(this.businessSubDetailData.amount) * Number(this.businessSubDetailData.tax) / 100;
          this.totalAmount = Number(this.basicAmount) + Number(taxAmount);

        } else {
          this.swalService.error(this.constant.errorTitle, response.message);
        }
      })
    }
  }

  sumEmp($event) {
    let empAmount: number = $event.value * 2;
    this.basicAmount = Number(this.businessSubDetailData.amount) + Number(empAmount);
    let taxAmount = Number(this.businessSubDetailData.amount) * Number(this.businessSubDetailData.tax) / 100;
    this.totalAmount = Number(this.basicAmount) + Number(taxAmount);
  }

  submit() {
    var requestParams = {
      id: this.subscription_id,
      company_name: this.businessSubModel.company_name,
      head_office: this.businessSubModel.head_office,
      siren: this.businessSubModel.siren,
      email: this.businessSubModel.email,
      creation_date: this.businessSubModel.creation_date,
      address: this.businessSubModel.address,
      vat: this.businessSubModel.vat,
      company_phone: this.businessSubModel.company_phone,
      first_name: this.businessSubModel.first_name,
      last_name: this.businessSubModel.last_name,
      user_name: this.businessSubModel.user_name,
      birthdate: this.businessSubModel.birthdate,
      password: this.businessSubModel.password,
      subscription_id: this.businessSub_id,
      subscription_plan_id: this.businessSubDetailData._id,
      company_code: this.businessSubModel.company_code,
      stripeToken: this.stripeToken,
      amount: this.businessSubDetailData.amount,
      employee_register_link: this.url,
      reference_source: this.businessSubModel.reference_source,
      numberOfEmployee: this.businessSubModel.numberOfEmployee,
      totalSub_empamount: this.totalAmount
    }
    console.log("requestParams----", requestParams)
    this.BusinessSubService
      .save_service_category(requestParams, 'company/register')
      .subscribe((results) => {
        if (results.success == false) {
          this.swalService.error(this.constant.errorTitle, results.message);
        } else {
          this.swalService.success(this.constant.successTitle, results.message, true);
          this.router.navigate(['/login']);
        }
      }, err => {
        console.log(err);
      });
  }


}
