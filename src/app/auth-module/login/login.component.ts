import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { LoginService } from '../../customer-modules/api.services/login/login.service';
import { Base64Service } from '../../core/services/base64-service.service';
import { NotificationService } from 'src/app/customer-modules/api.services/notiification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //#region Variable declaration
  loginObj = {
    email: null,
    password: null
  }
  // IndivisualSubModel
  //#region variable declaration
  constant: Constant = new Constant();
  //#endregion

  //#region constructor

  /**
   * @param IndivisualSubService 
   * @param swalService 
   */
  constructor(private route: Router,
    private LoginService: LoginService,
    private swalService: SwalService,public translate: TranslateService,
    private notificationService: NotificationService) { }



  ngOnInit(): void {
    localStorage.clear();
  }
 
  onLogin() {
    this.LoginService.login(this.loginObj, 'login').subscribe(results => {       
        if (results.success == false) {
          this.swalService.error(this.constant.errorTitle, results.message);         
        } else {
          localStorage.setItem('token', results.data.token);
          var userDetail = JSON.stringify(results.data)          
          var encodedUserDetails = Base64Service.encode(userDetail);
          if(encodedUserDetails){
            localStorage.setItem("userdata",encodedUserDetails);
          }
          this.swalService.success(this.constant.successTitle, results.message, true);
          this.notifiactionData();
          this.route.navigate(['/customer/home']);
        }
      }, err => {
        console.log(err);
      });
  }

  notifiactionData() {
    this.notificationService.getNotifiaction('notifications').subscribe(results => {
      if(results.success == false) {
        this.swalService.error(this.constant.errorTitle, results.message);
      }
      else {
       this.notificationService.addnotification(results.data)
      }
    })
  }
  //#endregion
}
