import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { environment } from 'src/environments/environment';
import { forgotPasswordService } from '../../customer-modules/api.services/forgotPassword/forgotPassword.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  API_URL = `${environment.forgotPassword}`;
  //#region Variable declaration
  forgotPasswordObj = {
    email:''
  }
  resultsSuccess: any = {};
  constant: Constant = new Constant();

  showForm: boolean = true;
  //#endregion

  //#region constructor
  constructor(private forgotPasswordService: forgotPasswordService,
    private swalService: SwalService,) { }
  //#endregion

  //#region methods
  
  /**
   * The method which will be called after constructor
   */
  ngOnInit(): void {
  }

  /**
   * The method which will be called on the click after reset my password
   */
   submit() {
    
    var requestParams = {
      email : this.forgotPasswordObj.email,
      link: this.API_URL
    }

    this.forgotPasswordService
      .forgotpassword(requestParams, 'forgotpassword')
      .subscribe((results) => {
        this.resultsSuccess = results;
        if (this.resultsSuccess.success) {          
          this.swalService.success(this.constant.successTitle,this.resultsSuccess.message,true);
          this.forgotPasswordObj.email= '';
        }
      },err => {
        /// here the function that you want you can check the status of the 
        ///error
        if (err.status != 200) {
          this.swalService.error('Try again!',err.error.message);
        }
      });
  }


  //#endregion

}
