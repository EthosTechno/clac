import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferService } from 'src/app/customer-modules/api.services';
import { Constant } from '../../constants/constant';
import { SwalService } from '../../helpers/swal.service';
import { CategoryModel } from '../../models';

@Component({
  selector: 'app-service-banner',
  templateUrl: './service-banner.component.html',
  styleUrls: ['./service-banner.component.scss']
})
export class ServiceBannerComponent implements OnInit {

  offerPopular: any;
  constant: Constant = new Constant();
  CorporateOfferCategory: CategoryModel[];
  @Output() searchCategory = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private swalService: SwalService
  ) { }

  
  ngOnInit(): void {
    this.getCategory();
  }

   /**
   * Get the Corporate offer Detail
   */
     getCategory(){           
      this.offerService.getCorporateOfferCategory("corporateoffercategorylist").subscribe((response)=>{
        if(response.success){
            this.CorporateOfferCategory = response.data  as CategoryModel[];
            
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
