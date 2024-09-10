import { Component, Input, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { IndivisualSubService } from '../../api.services/indivisualSubscription/indivisualSub.service';
import { ResponseModel } from 'src/app/core/models';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IndivisualSubModel } from 'src/app/core/models/indivisualSubscription/indivisualSub.model';
import { NgForm } from "@angular/forms"
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { Token } from '@angular/compiler';
declare var $: any;
@Component({
  selector: 'app-individual-subscription',
  templateUrl: './individual-subscription.component.html',
  styleUrls: ['./individual-subscription.component.scss']
})
export class IndividualSubscriptionComponent implements OnInit, AfterViewInit, OnDestroy {
  // IndivisualSubModel
  private stepper: Stepper;
  indivisualSubId: string = '';
  //#region variable declaration
  constant: Constant = new Constant();
  indivisualSubDetail: IndivisualSubModel = new IndivisualSubModel();
  totalFiles: any;
  @Input() subscription_id: any;
  indivisualSubDetailData: any;
  PlanDetails: any;
  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;
  stripe: any;
  loading: boolean = false;
  confirmation: any;

  card: any;
  //cardHandler = this.onChange.bind(this);
  error: string;
  stripeToken: any;
  @Input() isDisabled: boolean = true;
  bodMinDate: string;

  //#endregion

  //#region constructor

  /**
   * @param IndivisualSubService 
   * @param swalService 
   */
  constructor(private route: Router, private ActivatedRoute: ActivatedRoute,
    private indivisualSubService: IndivisualSubService,
    private swalService: SwalService,
    public translate: TranslateService, private stripeService: AngularStripeService, private cd: ChangeDetectorRef) { }

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

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  // displayTab(_next_id: any) {
  //   this.isDisabled = false;
  // }
  async onSubmit(form: NgForm) {
    const { token, error } = await this.stripe.createToken(this.card);
    if (token) {
      this.stripeToken = token.id
      console.log('Success=====================!', token);
      this.next();
    } else {
      this.error = error.message
      this.cd.detectChanges();
      console.log('Error:', error);
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 43) {
      return false;
    }
    return true;

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
    this.getSubscriptionDetail();
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }

  lang() {
    let selectedLanguage = localStorage.getItem("lang");
    if (!selectedLanguage) {
      this.translate.use('en');
      localStorage.setItem("lang", 'en')
    } else {
      if (selectedLanguage == 'en') {
        this.translate.use('fr')
        localStorage.setItem("lang", 'fr')
      } else {
        this.translate.use('en')
        localStorage.setItem("lang", 'en')
      }

    }
  }
  /**
  * Get the offer detail
  */
  getSubscriptionDetail() {
    this.indivisualSubId = this.ActivatedRoute.snapshot.params?.['id'];
    if (this.indivisualSubId) {
      this.indivisualSubService.getIndivisualSubDetail("subscription/plan/" + this.indivisualSubId).subscribe((response: ResponseModel) => {
        if (response.success) {
          this.indivisualSubDetailData = response.data;
        } else {
          this.swalService.error(this.constant.errorTitle, response.message);
        }
      })
    }
  }

  /**
   * The method which will be used to save the service category detail;
   */
  submit() {
    var requestParams = {
      id: this.subscription_id,
      first_name: this.indivisualSubDetail.first_name,
      last_name: this.indivisualSubDetail.last_name,
      user_name: this.indivisualSubDetail.user_name,
      email: this.indivisualSubDetail.email,
      mobile_no: this.indivisualSubDetail.mobile_no,
      password: this.indivisualSubDetail.password,
      birthdate: this.indivisualSubDetail.birthdate,
      register_date: this.indivisualSubDetail.register_date,
      subscription_id: this.indivisualSubId,
      subscription_plan_id: this.indivisualSubDetail.subscription_plan_id,
      country_code: this.indivisualSubDetail.country_code,
      stripeToken: this.stripeToken,
      amount: this.PlanDetails.amount,
      reference_source: this.indivisualSubDetail.reference_source
    }

    this.indivisualSubService
      .save_service_category(requestParams, 'individual/register')
      .subscribe((results) => {
        if (results.success == false) {
          this.swalService.error(this.constant.errorTitle, results.message);
        } else {
          this.swalService.success(this.constant.successTitle, results.message, true);
          this.route.navigate(['/login']);
        }
      }, err => {
        console.log(err);
      });
  }

  //#endregion

  passPlanData(event) {
    this.PlanDetails = event;
  }

  previous() {
    this.stepper.previous();
  }

  next() {
    this.stepper.next();
  }

}
