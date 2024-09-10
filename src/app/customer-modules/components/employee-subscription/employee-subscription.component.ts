import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { Constant } from 'src/app/core/constants/constant';
import { MyAccountService } from '../../api.services/myAccount/myaccount.service';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-employee-subscription',
  templateUrl: './employee-subscription.component.html',
  styleUrls: ['./employee-subscription.component.scss']
})
export class EmployeeSubscriptionComponent implements OnInit {

  private stepper: Stepper;

  constant: Constant = new Constant();
  FecturesDetails: any;
  bodMinDate: string;

  constructor(
    private myAccountService: MyAccountService,
    private ActivatedRoute: ActivatedRoute,
    private swalService: SwalService,
    private router: Router
  ) { }

  ngOnInit(): void {

    var yearMS = 365 * (1000 * 60 * 60 * 24); // 365 days
    var now = new Date().getTime();
    var maxDobMS = now - (16 * yearMS);
    this.bodMinDate = new Date(maxDobMS).toISOString().slice(0, 10)

    this.getFectures();

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: true,
      animation: true
    })
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }


  getFectures() {
    var id = this.ActivatedRoute.snapshot.params?.['id'];

    this.myAccountService
      .getFecturesDetails('company-employee/fectures/' + id).subscribe((results) => {
        if (results.success == true) {
          this.FecturesDetails = results.data;
        } else {
          this.swalService.error(this.constant.errorTitle, results.message);
        }
      }, err => {
        console.log(err);
      });

  }

  submit(data: any) {
    data.company_id = this.ActivatedRoute.snapshot.params?.['id'];
    this.myAccountService
      .empAdd(data, '/company-employee/register')
      .subscribe((results) => {
        if (results.success == false) {
          this.swalService.error(this.constant.errorTitle, results.message);
        } else {
          this.swalService.success(this.constant.successTitle, results.message, true);
          this.router.navigate(['login']);
        }
      }, err => {
        console.log(err);
      });
  }

  previous() {
    this.stepper.previous();
  }

  next() {
    this.stepper.next();
  }
}
