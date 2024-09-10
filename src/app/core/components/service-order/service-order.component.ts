import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceCategoryService } from 'src/app/customer-modules/api.services/serviceCategory/serviceCategory.service';
import { Constant } from '../../constants/constant';
import { SwalService } from '../../helpers/swal.service';
import { CategoryModel } from '../../models';
import { ServiceCatModel } from '../../models/serviceCategory/serviceCategory.model';
import { Base64Service } from '../../../core/services/base64-service.service';

@Component({
  selector: 'app-service-order',
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.scss']
})
export class ServiceOrderComponent implements OnInit {

  //#region Variable Declaration
  constant : Constant = new Constant();
  services : ServiceCatModel[] = [];
  requestParams = {
   limit: 6,
   page: 0,
   sortDirection: -1,
   sortyBy: "created_at",
   offer_category_id: ""
  }
  
  serviceModel: ServiceCatModel = new ServiceCatModel();
  firstOffer: ServiceCatModel = new ServiceCatModel();
  secondOffer: ServiceCatModel = new ServiceCatModel();

  @ViewChild('closeBtn') closeBtn: ElementRef;    

  currentCategory: string = '';
  totalRecords: number = 0;
  offerdetails: boolean = false;
  offer_id: any;
  selectedCategory: CategoryModel = new CategoryModel();
  generalCategories: CategoryModel[] = [];
  serviceCategories: CategoryModel[] = [];
  demo: any = ''
  id: any;
  //#endregion

  //#region constructor
  /**
   * @param ServiceCategoryService 
   * @param swalService 
   */
  constructor(
    private ServiceCategoryService: ServiceCategoryService,
    private swalService: SwalService) { }
  //#endregion


  /**
   * The method which will called after constructor
   */
  ngOnInit(): void {
    this.getServices();
    this.getGeneralCategories();
  }

  /**
   * the function which is used to get the offers
   */
  getServices() {
    this.requestParams.page = this.requestParams.page + 1;

    if (this.requestParams.page != 1) {
      this.requestParams.limit = 4;
    }

    this.ServiceCategoryService
      .getServiceList(this.requestParams, 'servicelist')
      .subscribe((result) => {
        if (result.success) {
          let services = result.data as ServiceCatModel[];
          this.services = [];

          if (services.length == 0) {
            this.firstOffer = undefined;
            this.secondOffer = undefined;
            this.services = [];
          }

          if (this.requestParams.page !== 1) {
            this.services = [...this.services, ...services];

          } else {
            this.services = services.slice(2, this.requestParams.limit)
          }
          if (this.requestParams.page == 1) {
            if (services && services.length > 0) {
              this.firstOffer = services[0];
            } else {
              this.firstOffer = undefined;
            }

            if (services && services.length > 1) {
              this.secondOffer = services[1];
            } else {
              this.secondOffer = undefined;
            }
          }
          this.totalRecords = result.data.totalDocs > 2 ? result.data.totalDocs - 2 : result.data.totalDocs;
          if (this.totalRecords < 2) {
            this.totalRecords = 0;
          }

        } else {
          this.swalService.error(this.constant.errorTitle, result.message);
        }
      }, err => {
        console.log(err);
      });
  }

  /**
   * The method which is used to get the data of general categories
   */
  getGeneralCategories() {
    this.ServiceCategoryService
      .getCategories('all-service-category-list')
      .subscribe((result) => {
        if (result.success) {
          this.generalCategories = result.data as CategoryModel[];
        } else {
          this.swalService.error(this.constant.errorTitle, result.message);
        }
      }, err => {
        console.log(err);
      });
  }


  getServiceCategories(event) {
    let req = {category_id: event }
    this.ServiceCategoryService
      .getserviceCategories(req,'category-wise-service-list')
      .subscribe((result) => {
               
        if (result.success) {
          this.serviceCategories = result.data[0].service;
          console.log("@@",this.serviceCategories);
        } else {
          this.swalService.error(this.constant.errorTitle, result.message);
        }
      }, err => {
        console.log(err);
      });
  }

  getServicePrice(data){      
    var price = data.split(",");      
    this.serviceModel.price  = price[1];      
  }

  submit() {
        
    var userdata = JSON.parse(Base64Service.decode(localStorage.getItem('userdata')));
    var status   = userdata.subscription_status;
    console.log('status',status);
    // if(!status){
    //   this.swalService.error(this.constant.errorTitle,'Renew Your Plan First.');     
    //  }else{

      var name = this.serviceModel.service_name.split(",");      
      this.serviceModel.service_name  = name[0];  
      
      var requestParams = {
        category_name: this.serviceModel.category_name,
        service_name: this.serviceModel.service_name,
        first_name: this.serviceModel.first_name,
        last_name: this.serviceModel.last_name,
        email: this.serviceModel.email,
        phone: this.serviceModel.phone,
        pick_up_address: this.serviceModel.pick_up_address,
        pick_up_time: this.serviceModel.pick_up_time,
        delivery_address: this.serviceModel.delivery_address,
        delivery_time: this.serviceModel.delivery_time,
        description: this.serviceModel.description,
        promo_code: this.serviceModel.promo_code,
        price: this.serviceModel.price,
        item_number: this.serviceModel.item_number
      }
  
      this.ServiceCategoryService
        .save_service(requestParams, '/service-order-form')
        .subscribe((results) => {
          if (results.success == false) {
            this.swalService.error(this.constant.errorTitle, results.message);
          } else {
            this.swalService.success(this.constant.successTitle, results.message, true);          
            this.serviceModel.service_name  = ''
            this.serviceModel.category_name = ''
            this.closeBtn.nativeElement.click();
          }
        }, err => {
          console.log(err);
        });
        
    // }

   
  }

}


  //#endregion
