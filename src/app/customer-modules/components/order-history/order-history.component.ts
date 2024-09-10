import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { EmployeeModel, ResponseModel } from 'src/app/core/models';
import { OrderHistoryModel } from 'src/app/core/models/orderHistory.model';
import { MyAccountService } from '../../api.services/myAccount/myaccount.service';
import { OrderHistoryService } from '../../api.services/orderHistory/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  websitePattern = "";
  cols: any;
  constant: Constant = new Constant();
  totalRecords: number = 0;
  employeeDetails: any;
  totalDocs: any;
  clientModel: OrderHistoryModel = new OrderHistoryModel();

  resetModel = {
    first: 0,
    rows: 10,
    sortField: '',
    sortOrder: 1,
  }

  @Output() changeStatus: EventEmitter<any> = new EventEmitter();
  @ViewChild('CompanyModalClose') CompanyModalClose: ElementRef;
  bodMinDate: string;

  constructor(private swalService: SwalService,private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {

    var yearMS = 365 * (1000 * 60 * 60 * 24); // 365 days
    var now = new Date().getTime();
    var maxDobMS = now - (16 * yearMS);
    this.bodMinDate = new Date(maxDobMS).toISOString().slice(0, 10)

    this.websitePattern = this.constant.webSitePattern;
    this.cols = [
      { field: 'service_name', header: 'Services', type: 'string', display: true},
      { field: 'date', header: 'Date', type: 'date', display: true },
      { field: 'price', header: 'Price', type: 'price', display: true },
      { field: 'status', header: 'Status', type: 'string', display: true },
      { field: '_id', header: '', type: 'button', display: true },
      { field: 'invoice_pdf', header: '', type: 'button', display: true },

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
    this.orderHistoryService.getOrderHistoryDetails(this.clientModel, "getall-order-history").subscribe((response: ResponseModel) => {

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

  reorderInvoice(value: any) {
    this.orderHistoryService.getReOrder(`re-order/${value}`).subscribe((response: ResponseModel) => {
      if (response.success) {
        this.swalService.success(this.constant.successTitle, response.message, true);
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  downloadInvoice(value: any) {
    console.log(value); 
    const link = document.createElement('a');
        link.setAttribute('href', value);
        link.setAttribute('download', value);
        document.body.appendChild(link);
        link.click();
        link.remove();
  }


  /**
   * The method to save the employee detail
   */

  //#endregion


}
