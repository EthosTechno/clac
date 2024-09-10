import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { MyAccountService } from '../../api.services/myAccount/myaccount.service';
import { Base64Service } from '../../../core/services/base64-service.service';
import { EmployeeModel, ResponseModel } from 'src/app/core/models';

@Component({
  selector: 'app-company-client',
  templateUrl: './company-client.component.html',
  styleUrls: ['./company-client.component.scss']
})
export class CompanyClientComponent implements OnInit {

  websitePattern = "";
  cols: any;
  constant: Constant = new Constant();
  totalRecords: number = 0;
  employeeDetails: any;
  totalDocs: any;
  clientModel: EmployeeModel = new EmployeeModel();

  resetModel = {
    first: 0,
    rows: 10,
    sortField: '',
    sortOrder: 1,
  }

  @Output() changeStatus: EventEmitter<any> = new EventEmitter();
  @ViewChild('CompanyModalClose') CompanyModalClose: ElementRef;
  bodMinDate: string;

  constructor(private swalService: SwalService, private myAccountService: MyAccountService) { }

  ngOnInit(): void {

    var yearMS = 365 * (1000 * 60 * 60 * 24); // 365 days
    var now = new Date().getTime();
    var maxDobMS = now - (16 * yearMS);
    this.bodMinDate = new Date(maxDobMS).toISOString().slice(0, 10)

    this.websitePattern = this.constant.webSitePattern;
    this.cols = [
      { field: 'first_name', header: 'First Name', type: 'string', display: true, isSortable: true },
      { field: 'last_name', header: 'Last Name', type: 'string', display: true, isSortable: true },
      { field: 'email', header: 'Email Address', type: 'string', display: true, isSortable: true },
      { field: 'mobile_no', header: 'Phone Number', type: 'string', display: true, isSortable: true },
      { field: 'status', header: 'Status', type: 'dropdown', display: false, isSortable: true },
    ];
  }


  onLazyLoad($event: LazyLoadEvent) {
    this.getClientDetail($event);
  }

  /**
   * Get the news details
   */
  getClientDetail($event) {

    console.log("######", $event);

    let page: number = 0;

    if ($event.first !== undefined) {
      if ($event.first === 0) {
        page = 0;
      }
      else {
        page = Math.floor(($event.first)  / $event.rows);
      }
    }

    this.clientModel.limit = $event.rows;
    this.clientModel.page = page + 1;
    this.clientModel.search = this.clientModel.search
    this.clientModel.sortDirection = $event.sortOrder;
    this.clientModel.sortyBy = $event.sortField;

    this.myAccountService.getClientDetail(this.clientModel, "client-list").subscribe((response: ResponseModel) => {

      if (response.success) {
        if (response.data) {
          this.employeeDetails = response.data.docs;
          this.totalDocs = response.data.totalDocs
        }
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }


  /**
   * The method to save the employee detail
   */
  submit(dataForm) {

    var userdata = JSON.parse(Base64Service.decode(localStorage.getItem('userdata')));
    dataForm.company_id = userdata.company_id;

    this.myAccountService.addClient(dataForm, "client-register").subscribe((response) => {
      if (response.success) {
        this.CompanyModalClose.nativeElement.click();
        this.swalService.success(this.constant.successTitle, response.message, true);
        this.getClientDetail(this.resetModel);
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }
  //#endregion

}

