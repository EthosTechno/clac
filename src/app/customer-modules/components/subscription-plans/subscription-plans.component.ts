import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { SubscriptionModel } from 'src/app/core/models/subscription/subscription.model';
import { ResponseModel } from 'src/app/core/models';
import { SubscriptionService } from '../../api.services/subscription/subscription.service';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss']
})
export class SubscriptionPlansComponent implements OnInit {


  //#region variable declaration
  constant: Constant = new Constant();
  subscriptionDetail: SubscriptionModel = new SubscriptionModel();
  //#endregion

  //#region constructor
  
  /**
   * @param SubscriptionService 
   * @param swalService 
   */
  constructor(
    private subscriptionService: SubscriptionService,
    private swalService: SwalService) { }
  //#endregion

  //#region Methods

  /**
   * The method which will be called after constructor
   */
  ngOnInit(): void {
    this.getSubscriptionDetail();
  }

  /**
   * Get the offer detail
   */
   getSubscriptionDetail(){

      this.subscriptionService.getSubscriptionDetail("subscription/list").subscribe((response:ResponseModel)=>{
        if(response.success){
          this.subscriptionDetail = response.data;
        }else{
          this.swalService.error(this.constant.errorTitle,response.message);
        }
      })
  }
  //#endregion

}
