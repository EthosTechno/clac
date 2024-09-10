import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';

@Component({
  selector: 'app-cancel-my-subscription',
  templateUrl: './cancel-my-subscription.component.html',
  styleUrls: ['./cancel-my-subscription.component.scss']
})
export class CancelMySubscriptionComponent implements OnInit {

  //#region Private variables
  constant: Constant = new Constant();
  //#endregion

  //#region COnstructor
  constructor(private swalService: SwalService) { }
  //#endregion

  //#region methods
  
  /**
   * The methods which will be called after constructor
   */
  ngOnInit(): void {

  }

  /**
   * The methods which is used to cancel subscription
   */
  cancelSubscription(){
    this.swalService.confirm(this.constant.confirmTitle,this.constant.confirmTextToCancelSubscription,true,this.constant.confirmButtonText).then(function(result){
      if(result.isConfirmed){
        //TO DO : Call API to cancel Subscription
        console.log("You confirmed");
      }
      else{
        console.log("You cancelled your mind");
      }
    })
  }

  //#endregion

}
