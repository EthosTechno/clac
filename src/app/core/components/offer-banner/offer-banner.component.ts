import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { OfferService } from 'src/app/customer-modules/api.services';
import { CategoryModel } from '../../models';


@Component({
  selector: 'app-offer-banner',
  templateUrl: './offer-banner.component.html',
  styleUrls: ['./offer-banner.component.scss']
})
export class OfferBannerComponent implements OnInit {
  
  offerPopular: any;
  constant: Constant = new Constant();
  offerCategory: any;
  @Output() searchCategory = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private swalService: SwalService
  ) { }

  
  ngOnInit(): void {
    this.getPopularCategory();
    this.getCategory();
  }

    /**
   * Get the offer detail
   */
     getPopularCategory(){           
        this.offerService.getPopularCategory("popularoffercategory").subscribe((response)=>{
          if(response.success){
            this.offerPopular = response.data;
          }else{
            this.swalService.error(this.constant.errorTitle,response.message);
          }
        })      
    }
    //#endregion


    /**
   * Get the offer detail
   */
     getCategory(){           
      this.offerService.getOfferCategory("genrealoffercategorylist").subscribe((response)=>{
        if(response.success){
          this.offerCategory = response.data  as CategoryModel[];
        }else{
          this.swalService.error(this.constant.errorTitle,response.message);
        }
      })      
   }
  //#endregion

  submit(data : any){
   this.searchCategory.emit(data);
  }

}
