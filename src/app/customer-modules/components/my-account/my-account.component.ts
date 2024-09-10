import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { ResponseModel, UserModel } from 'src/app/core/models';
import { UserService } from '../../api.services';
import { Base64Service } from '../../../core/services/base64-service.service';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  userModel: UserModel = new UserModel();
  constant: Constant = new Constant();
  // subscription:any= Subscription;
  firstname: any;
  lastname: any;
  profile_image: any;
  subscription:any= Subscription;
  resProfile: any = [];
  img: File;
  imgShow: string | ArrayBuffer;
  userDetail: any;
  role: any;
  user_subscription_id: any;
  subscription_status: any;

  constructor(
    private userService: UserService,
    private swalService: SwalService,
    private router: Router,
   ) { }

  ngOnInit(): void {
    this.userDetail = {};
    var userdata = JSON.parse(Base64Service.decode(localStorage.getItem('userdata')));
    
    console.log("!!!!!!!",userdata);
    
    this.role = userdata.active_role;
    this.user_subscription_id = userdata.user_subscription_id;  
    this.subscription_status  = userdata.subscription_status;  
    this.getUserInformation();  
  }

  getUserInformation() {
    // TO DO CALL API TO GET THE DATA  
    this.userService.getUserDetail('get-profile').subscribe((response: ResponseModel) => {
      if (response.success) {
        console.log('res Data',response.data)
        this.userModel = response.data;

        console.log("@@#####",this.userModel);
        
        this.firstname = this.userModel.first_name;
        this.lastname = this.userModel.last_name;
        this.userDetail.profile_image = this.userModel.profile_image;
        this.subscription = this.userService.message.subscribe(
          (message) => {
            this.firstname = message
          }
        );
        this.subscription = this.userService.message1.subscribe(
          (message1) => {
            this.lastname = message1
          }
        );
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

/**
   * Profile upoad function 
   * @param event 
  **/

 onFileChanged(event): any {
  this.img = event.target.files[0];

  if (this.img != undefined) {

    /*** FILE VALID EXT ***/
    let filename = event.target.files[0].name;
    let ext = filename.substring(filename.lastIndexOf('.') + 1);
    if (ext.toLowerCase() != 'png' && ext.toLowerCase() != 'jpg' && ext.toLowerCase() != 'jpeg') {
      this.swalService.error(this.constant.errorTitle, 'Selected file format is not supported');
      return false;
    }

    /*** FILE VALID SIZE ***/
    if (this.img.size/1024/1024 > 2) {
     this.swalService.error(this.constant.errorTitle, 'Selected file is to large max 2 mb');
     return false;
    }

    /** UPLOAD IMAGE **/
    var reader = new FileReader();
    reader.readAsDataURL(this.img);
    reader.onload = (_event) => {
      this.imgShow = reader.result;

      //// CALL API FOR UPLOAD PROFILE IMAGE ////
      var requestParams = {
        profile_image: this.imgShow,
      }

      this.userService
        .profile_image(requestParams, 'profile-image-update')
        .subscribe((results) => {
          if (results.success == false) {
            this.swalService.error(this.constant.errorTitle, results.message);
          } else {
            /** SET NEW URL FOR IMG **/
            this.userDetail.profile_image = results.data;
            var userDetailModel = {
              id: this.userDetail._id,
              profile_image: this.userDetail.profile_image
            }

            var userDetail = JSON.stringify(userDetailModel)          
            // var encodedUserDetails = Base64Service.encode(userDetail);
            // if (encodedUserDetails) {
            //   localStorage.setItem("userdata", encodedUserDetails);
            // }
            this.swalService.success(this.constant.successTitle, results.message, true);
          }
        }, err => {
          console.log(err);
        });
      //// END UPLOAD FILE CODE ////
    }
  } else {
    this.swalService.error('Try again!', 'Something Wrong');
    return false;
  }

}

CancelPlan(id: any)
{
  var that = this;
  this.swalService.confirm(this.constant.confirmTitle,this.constant.confirmTextToDeletePlan,true,this.constant.confirmButtonText).then(function(response){
    if(response.isConfirmed){
      
      console.log("@@@@@@@",that.user_subscription_id);
      
      var req = {id : that.user_subscription_id}
      that.userService.cancelPlan(req,'user-cancel-subscription-plan').subscribe((response: ResponseModel) => {
        if (response.success) {                  
          that.swalService.success(that.constant.successTitle, response.message, true);               
          var userdata = JSON.parse(Base64Service.decode(localStorage.getItem('userdata')));
          userdata.subscription_status = false;          
          var userDetail = JSON.stringify(userdata)          
          var encodedUserDetails = Base64Service.encode(userDetail);
          localStorage.setItem("userdata",encodedUserDetails);         
          that.router.navigate(['/customer/home']);    
        } else {
          that.swalService.error(that.constant.errorTitle, response.message);
        }
      })

    }
  }); 

}
  

}
