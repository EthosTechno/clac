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
  selector: 'app-idea-box',
  templateUrl: './idea-box.component.html',
  styleUrls: ['./idea-box.component.scss']
})
export class IdeaBoxComponent implements OnInit {
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
      { field: 'srNo', header: 'Sr No.', type: 'string', display: true},
      { field: 'title', header: 'Title', type: 'string', display: true, isSortable: true },
      { field: 'description', header: 'Description', type: 'string', display: true, isSortable: true },
    
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
    console.log('page Number', page )
    this.clientModel.limit = $event.rows;
    this.clientModel.page = page +1;
    this.clientModel.search = this.clientModel.search
    this.clientModel.sortDirection = $event.sortOrder;
    this.clientModel.sortyBy = $event.sortField;
    this.myAccountService.getIdeaBox(this.clientModel, "suggestion/getAll").subscribe((response: ResponseModel) => {

      if (response.success) {
        if (response.data) {
         this.employeeDetails = response.data.docs;
         let limit = response.data.limit
         this.employeeDetails = this.employeeDetails.reduce((acc,item,i) => {
            item.srNo = response.data.page == 1 ? i + 1 : i + 1  + (limit * (response.data.page-1))
            acc.push(item);
            return acc;
          },[])
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

  //#endregion


}
