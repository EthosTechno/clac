import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Constant } from 'src/app/core/constants/constant';
import { countries } from 'src/app/core/constants/country';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { EmployeeModel, ResponseModel } from 'src/app/core/models';
import { EmployeeService } from '../../api.services';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  websitePattern = "";
  cols: any;
  //#region variables
  employeeModel: EmployeeModel = new EmployeeModel();
  constant: Constant = new Constant();
  totalRecords: number = 0;
  employeeDetails: any;
  totalDocs: any;

  resetModel = {
    first: 0,
    rows: 10,
    sortField: '',
    sortOrder: 1,
  }
  public countries:any = countries

  @Output() changeStatus: EventEmitter<any> = new EventEmitter();
  @ViewChild('EmployeesModalClose') EmployeesModalClose: ElementRef;
  bodMinDate: string;

  /**
   * @param employeeService 
   */
  constructor(private employeeService: EmployeeService, private swalService: SwalService) { }

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
      // { field: 'delete', header: '', type: 'delete', display: true, isSortable: false },
      { field: '_id', header: '', type: 'delete', display: true, isSortable: false },

    ];
  }

  // updateStatus(status,id){
  //   let requestModel = {
  //     status: status,
  //     id: id
  //   }
  //   this.changeStatus.emit(requestModel);
  // }

  onLazyLoad($event: LazyLoadEvent) {
    this.getEmployeeDetail($event)
  }

  /**
   * Get the news details
   */
  getEmployeeDetail($event) {

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

    this.employeeModel.limit = $event.rows;
    this.employeeModel.page = page + 1;
    this.employeeModel.search = this.employeeModel.search
    this.employeeModel.sortDirection = $event.sortOrder;
    this.employeeModel.sortyBy = $event.sortField;

    this.employeeService.getEmployeesDetail(this.employeeModel, "employee-list").subscribe((response: ResponseModel) => {

      if (response.success) {
        if (response.data) {
          this.employeeDetails = response.data.docs;
          console.log(this.employeeDetails)
          this.totalDocs = response.data.totalDocs
        }
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }


  // deleteRecord(id: any) {
  //   var requestModel = {
  //     id: id
  //   }
  //   this.employeeService.getEmployeeDelete(requestModel, "news/delete").subscribe((response: ResponseModel) => {
  //     if (response.success) {
  //       this.swalService.success(this.constant.successTitle, response.message, true);
  //       this.getEmployeeDetail(this.resetModel);
  //     } else {
  //       this.swalService.error(this.constant.errorTitle, response.message);
  //     }
  //   })

  // }




  /**
   * delete the employee
   * @param employeeId 
   */
  deleteEmployee(employeeId: number) {
    console.log("employeeId", employeeId)
    var that = this;
    this.swalService.confirm(this.constant.confirmTitle, this.constant.confirmTextToDeleteNews, true, this.constant.confirmButtonText).then(function (response) {
      if (response.isConfirmed) {
        var requestModel = {
          id: employeeId
        }

        that.employeeService.getEmployeeDelete(requestModel, "employee-delete").subscribe((response: ResponseModel) => {
          if (response.success) {
            that.swalService.success(that.constant.successTitle, response.message, true);
            that.getEmployeeDetail(that.resetModel);
          } else {
            that.swalService.error(that.constant.errorTitle, response.message);
          }
        })

      } else {
        // console.log('You cancelled');
      }
    })
  }

  /**
   * The method to save the employee detail
   */
  submit(employeeForm) {

    this.employeeService.addEmployee(employeeForm, "employee-register").subscribe((responseModel: ResponseModel) => {
      if (responseModel.success) {
        this.EmployeesModalClose.nativeElement.click();
        this.swalService.success(this.constant.successTitle, responseModel.message, true);
        this.getEmployeeDetail(this.resetModel);
      } else {
        this.swalService.error(this.constant.errorTitle, responseModel.message);
      }
    })


  }

  reset() {
    this.employeeModel.country_code = '+33'
  }
  //#endregion

}
