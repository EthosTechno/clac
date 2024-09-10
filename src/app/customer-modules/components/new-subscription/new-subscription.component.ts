import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndivisualSubModel } from 'src/app/core/models/indivisualSubscription/indivisualSub.model';
import { UserService } from '../../api.services';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { Constant } from 'src/app/core/constants/constant';
import { UserModel } from 'src/app/core/models';

@Component({
  selector: 'app-new-subscription',
  templateUrl: './new-subscription.component.html',
  styleUrls: ['./new-subscription.component.scss']
})
export class NewSubscriptionComponent implements OnInit {
  bodMinDate: string;
  constant: Constant = new Constant();
  indivisualSubDetail: IndivisualSubModel = new IndivisualSubModel();

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private swalService: SwalService) { }

  ngOnInit(): void {
    localStorage.clear();
    var yearMS = 365 * (1000 * 60 * 60 * 24); // 365 days
    var now = new Date().getTime();
    var maxDobMS = now - (16 * yearMS);
    this.bodMinDate = new Date(maxDobMS).toISOString().slice(0, 10);
    debugger
    let routes = this.route.snapshot.params['id'];

    this.getListData(routes);

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 43) {
      return false;
    }
    return true;

  }

  getListData(routes){
    let link = `stripeUserRegisterWebhook/${routes}`
    this.userService.getstripeUserRegisterWebhook(link).subscribe((response) => {
      if (response.success) {
        this.indivisualSubDetail = response.data;
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  SubmitWebhookDetails(){
    console.log(this.indivisualSubDetail)
    this.userService.updatestripeUserRegisterWebhook(this.indivisualSubDetail, 'UpatestripeUserRegisterWebhook').subscribe((response) => {
      // if (response.success) {
      //   this.indivisualSubDetail = response.data;
      // } else {
      //   this.swalService.error(this.constant.errorTitle, response.message);
      // }
    })
  }

}
