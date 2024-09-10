import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constant } from 'src/app/core/constants/constant';
import { countries } from 'src/app/core/constants/country';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { ResponseModel, UserModel } from 'src/app/core/models';
import { Base64Service } from '../../../core/services/base64-service.service';
import { UserService } from '../../api.services';

@Component({
  selector: 'app-my-information',
  templateUrl: './my-information.component.html',
  styleUrls: ['./my-information.component.scss']
})
export class MyInformationComponent implements OnInit {

  //#region Private Variables
  userModel: UserModel = new UserModel();
  constant: Constant = new Constant();
  disabledEmail: boolean = false;
  disabledPassword: boolean = true;
  disabledPhone: boolean = true;
  disabledCode: boolean = true;
  subscription: any = Subscription;
  firstname: any;
  lastname: any;
  edituserObject = {
    first_name: null,
    last_name: null,
  };
  public countries:any = countries
  public options:any;
  subDomain: any;
  role: any;
   
  //#endregion

  //#region Constructor
  constructor(
    private userService: UserService,
    private swalService: SwalService) { }
  //#endregion

  //#region Methods
  ngOnInit(): void {
    this.getUserInformation();
    var userdata = JSON.parse(Base64Service.decode(localStorage.getItem('userdata')));
    this.role = userdata.active_role;
    this.options = {
      multiple: true,
      closeOnSelect: false,
      width: '100%'
    };
  
  }

  /**
   * The methods which will used to get the user information
   */
  getUserInformation() {
    // TO DO CALL API TO GET THE DATA  
    this.userService.getUserDetail('get-profile').subscribe((response: ResponseModel) => {
      if (response.success) {
        this.userModel = response.data;
        this.edituserObject = response.data;
        this.firstname = this.edituserObject.first_name;
        this.lastname = this.edituserObject.last_name;
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  /**
   * Submit the form of user and save
   */
  submit() {
    let requestModal = {
      first_name: this.userModel.first_name,
      last_name: this.userModel.last_name,
      mobile_no: this.userModel.mobile_no,
      country_code: this.userModel.country_code,
      user_address: this.userModel.user_address,
      email:  this.userModel.email,
      sub_domain: this.userModel.sub_domain ?? ''
    }

    this.userService.saveRecords(requestModal, 'update-profile').subscribe((response: ResponseModel) => {
      if (response.success) {

        this.userService.setMessage(this.edituserObject.first_name);
        this.userService.setMessage1(this.edituserObject.last_name);

        this.swalService.success(this.constant.successTitle, response.message, true);
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })


  }
  //#endregion
}