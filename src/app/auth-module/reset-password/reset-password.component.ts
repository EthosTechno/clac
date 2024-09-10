import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { resetPasswordService } from '../../customer-modules/api.services/resetPassword/resetpassword.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  model: any = {};
 
  resultsSuccess: any = {};
  constant: Constant = new Constant();

  code: any;
  resetPasswordFormObj = {
    new_password: null,
    confirm_password: null,
    code: null
  };


  constructor(private resetPasswordService: resetPasswordService,
    private swalService: SwalService,  private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.router.navigate(['/dashboard']);         
    }else{
      this.code = this.route.snapshot.params['code'];
      if (this.code) {
        this.checkCodeIsExistOrNot();
      }
    }
  }

  submit() {
    this.resetPasswordFormObj.code = this.code;
    var requestParams = {
      code: this.code,
      new_password: this.resetPasswordFormObj.new_password,
      confirm_password: this.resetPasswordFormObj.confirm_password
    }
    this.resetPasswordService
      .resetpassword(requestParams,'resetpassword')
      .subscribe((results) => {
        this.resultsSuccess = results;
        if (this.resultsSuccess.result == false) {
          this.swalService.error(this.constant.errorTitle,this.resultsSuccess.message);
        }else{
          this.swalService.success(this.constant.successTitle,this.resultsSuccess.message,true);
          setTimeout(() => {
            this.router.navigate(['/login']);  
          }, 2300);
          
        }
      },err=>{
        if (err.status != 200) {
          this.swalService.error('Try again!', err.error.message);
        }
      });
  }

  checkCodeIsExistOrNot() {
    var requestParams = {
      code: this.code
    }

    this.resetPasswordService
      .isCodeExist(requestParams, '/resetpasswordcodecheck')
      .subscribe((results) => {
        this.resultsSuccess = results;
        if (!this.resultsSuccess.success) {
          this.swalService.info(this.constant.infoTitle, this.resultsSuccess.message, false, "");
          setTimeout(() => {
            this.router.navigate(['/forgotpassword']);  
          }, 2000);
        }
      }, err => {
        /// here the function that you want you can check the status of the 
        ///error
        if (err.status != 200) {
          this.swalService.error('Try again!', err.error.message);
          setTimeout(() => {
            this.router.navigate(['/forgotpassword']);  
          }, 2000);
        }
      });
  }

}
