import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ServiceCategoryService } from 'src/app/customer-modules/api.services/serviceCategory/serviceCategory.service';
import { Constant } from '../../constants/constant';
import { SwalService } from '../../helpers/swal.service';
import { contactusModel } from '../../models/contactus.model';

@Component({
  selector: 'app-contact-us-details',
  templateUrl: './contact-us-details.component.html',
  styleUrls: ['./contact-us-details.component.scss']
})
export class ContactUsDetailsComponent implements OnInit {
  contactUsModel: contactusModel = new contactusModel();
  constant: Constant = new Constant();
  @ViewChild('closeBtn') closeBtn: ElementRef;    

  constructor(
    private ServiceCategoryService: ServiceCategoryService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    var requestParams = {
      first_name: this.contactUsModel.first_name,
      last_name: this.contactUsModel.last_name,
      phoneNumber: this.contactUsModel.phoneNumber,
      email: this.contactUsModel.email,
      message: this.contactUsModel.message
    }

    this.ServiceCategoryService
      .save_service(requestParams, 'contactUs')
      .subscribe((results) => {
        if (results.success == false) {
          this.swalService.error(this.constant.errorTitle, results.message);
        } else {
          this.swalService.success(this.constant.successTitle, results.message, true);
          this.contactUsModel.first_name = ''
          this.contactUsModel.last_name = ''
          this.contactUsModel.email = ''
          this.contactUsModel.message = ''
          this.contactUsModel.phoneNumber = ''
          this.closeBtn.nativeElement.click();
        }
      }, err => {
        console.log(err);
      });

   console.log(requestParams)
  }
}
