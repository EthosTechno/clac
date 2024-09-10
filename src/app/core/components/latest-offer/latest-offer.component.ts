import { Component, Input, OnInit} from '@angular/core';
import { OfferService } from 'src/app/customer-modules/api.services';
import { Constant } from '../../constants/constant';
import { SwalService } from '../../helpers/swal.service';
import { CategoryModel, OffersModel } from '../../models';

@Component({
  selector: 'app-latest-offer',
  templateUrl: './latest-offer.component.html',
  styleUrls: ['./latest-offer.component.scss']
})

export class LatestOfferComponent implements OnInit {

  @Input() serachData : any
  //#region Variable Declaration
  constant: Constant = new Constant();
  offers: OffersModel[] = [];
  requestParams = {
    limit: 6,
    page: 0,
    sortDirection: -1,
    sortyBy: "created_at",
    offer_category_id: "",
    search:""
  }
  firstOffer: OffersModel = new OffersModel();
  secondOffer: OffersModel = new OffersModel();
  generalCategories: CategoryModel[] = [];
  currentCategory: string = '';
  selectedCategory: CategoryModel = new CategoryModel();
  totalRecords : number = 0;
  offerdetails: boolean = false;
  offer_id: any;
  
  //#endregion

  //#region constructor
  /**
   * @param offerService 
   * @param swalService 
   */
  constructor(
    private offerService: OfferService,
    private swalService: SwalService) { }
  //#endregion

  //#region Methods

  /**
   * The method which will called after constructor
   */
  ngOnInit(): void {
    this.getOffers();
    this.getGeneralCategories();        
  }

  ngOnChanges(){
    console.log("##!!!!",this.serachData);
    if(this.serachData != undefined){
      this.requestParams.offer_category_id = this.serachData.category;
      this.requestParams.search = this.serachData.search;
      this.requestParams.page = 0;
      this.getOffers();
    }
  }
  /**
   * the function which is used to get the offers
   */
  getOffers() {
    this.requestParams.page = this.requestParams.page + 1;
    
    if (this.requestParams.page != 1) {
      this.requestParams.limit = 4;
    }
    

    if (this.selectedCategory) {
      var lengthCategory = Object.keys(this.selectedCategory);      
      if(lengthCategory.length > 0){         
        this.requestParams.offer_category_id = this.selectedCategory._id;
        this.currentCategory = this.selectedCategory.name;
      }           
    }

 
    this.offerService
      .getOfferList(this.requestParams, 'genrealofferlist')
      .subscribe((result) => {
        if (result.success) {
          let offers = result.data.data as OffersModel[];                  
          
          if(offers.length == 0){
            this.firstOffer = undefined;
            this.secondOffer = undefined;
            this.offers = [];
          }

          if (this.requestParams.page !== 1) {
            this.offers = [...this.offers, ...offers];
          }else{           
            this.offers = offers                                         
          }
           
          this.totalRecords = result.data.totalDocs;          

          // this.totalRecords = result.data.totalDocs > 2 ? result.data.totalDocs - 2 : result.data.totalDocs;
          // if(this.totalRecords < 2){
          //   this.totalRecords = 0;
          // }                   
          
        } else {
          //this.swalService.error(this.constant.errorTitle, result.message);
        }
      }, err => {
        console.log(err);
      });
  }

  /**
   * The method which is used to get the data of general categories
   */
  getGeneralCategories() {
    this.offerService
      .getCategories('genrealoffercategorylist')
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

  /***
   * Filter the offer by category
   */
  getGetOfferByCategory(categoryModel: CategoryModel) {
    this.selectedCategory = categoryModel;
    this.requestParams.offer_category_id = categoryModel._id;
    this.requestParams.search = '';
    this.requestParams.page = 0;
    this.getOffers();
  }

  showDetails(id : any){              
    this.offerdetails = true;
    this.offer_id = id;
  }

  closeModalPopup(){
    this.offerdetails = false;
  }
  
  //#endregion
}
