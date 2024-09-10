import { Component, OnInit } from '@angular/core';
import { ServiceCategoryService } from 'src/app/customer-modules/api.services/serviceCategory/serviceCategory.service';
import { Constant } from '../../constants/constant';
import { SwalService } from '../../helpers/swal.service';
import { CategoryModel } from '../../models';
import { ServiceCatModel } from '../../models/serviceCategory/serviceCategory.model';

@Component({
  selector: 'app-more-services',
  templateUrl: './more-services.component.html',
  styleUrls: ['./more-services.component.scss']
})
export class MoreServicesComponent implements OnInit {

  //#region Variable Declaration
  constant: Constant = new Constant();
  services: ServiceCatModel[] = [];
  requestParams = {
    limit: 6,
    page: 0
  }
  serviceModel: ServiceCatModel = new ServiceCatModel();

  firstOffer: ServiceCatModel = new ServiceCatModel();
  secondOffer: ServiceCatModel = new ServiceCatModel();

  currentCategory: string = '';
  // selectedCategory: CategoryModel = new CategoryModel();
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

  //#region Methods

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
      this.requestParams.limit = 6;
    }

    this.ServiceCategoryService
      .getServiceList(this.requestParams, 'servicelist')
      .subscribe((result) => {
              
        console.log("%%%%%%",result);
        if (result.success) {
          let services = result.data.data;
          //this.services = [];                   

          if (Object.keys(services).length == 0) {
            this.firstOffer = undefined;
            this.secondOffer = undefined;
            this.services = [];
          }

          if (this.requestParams.page !== 1) {
            this.services = [...this.services, ...services];            
          } else {            
            this.services = services.slice(0, this.requestParams.limit)
          }
        
          this.totalRecords = result.data.total;
          if (this.totalRecords < 2) {
            this.totalRecords = 0;
          }
          
          console.log("#####",this.totalRecords);
          
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
    let req =
    {
      category_id: event
    }
    this.ServiceCategoryService
      .getserviceCategories(req,'category-wise-service-list')
      .subscribe((result) => {
        if (result.success) {
          this.serviceCategories = result.data as CategoryModel[];
          console.log('serviceCategories===========', this.serviceCategories)
        } else {
          this.swalService.error(this.constant.errorTitle, result.message);
        }
      }, err => {
        console.log(err);
      });
  }

  submit() {
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
      price: this.serviceModel.price
    }

    this.ServiceCategoryService
      .save_service(requestParams, '/service-order-form')
      .subscribe((results) => {
        if (results.success == false) {
          this.swalService.error(this.constant.errorTitle, results.message);
        } else {
          this.swalService.success(this.constant.successTitle, results.message, true);
        }
      }, err => {
        console.log(err);
      });
  }
}


  //#endregion

