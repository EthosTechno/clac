import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { MyAccountService } from '../../api.services/myAccount/myaccount.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  //#region variable declaration
  changepassword: any;
  constant: Constant = new Constant();
  //#endregion

  //#region constructor

  /**
   * @param swalService 
   */
  constructor(private myAccountService: MyAccountService,
    private router: Router,private swalService: SwalService) { }
  //#endregion
  
  //#region methods

  /**
   * The methods which will be called after constructor
   */
  ngOnInit(): void {
    this.changepassword = {};
  }

/**
   * The change password
   */
 changePassword() {
  var requestParams = {
    old_password: this.changepassword.currentpassword,
    new_password: this.changepassword.newpassword,
    confirm_password: this.changepassword.confirmPassword
  }

  this.myAccountService
    .changePassword(requestParams, 'changepassword')
    .subscribe((results) => {
      if (results.success == false) {
        this.swalService.error(this.constant.errorTitle, results.message);
      } else {
        this.swalService.success(this.constant.successTitle, results.message, true);
        this.changepassword = {};
        this.router.navigate(['/login']);  

      }
    }, err => {
      console.log(err);
    });
} 
  //#endregion

}
