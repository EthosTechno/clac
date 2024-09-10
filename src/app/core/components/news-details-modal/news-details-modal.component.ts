import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { OffersModel, ResponseModel } from 'src/app/core/models';
import { OfferService } from 'src/app/customer-modules/api.services';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-news-details-modal',
  templateUrl: './news-details-modal.component.html',
  styleUrls: ['./news-details-modal.component.scss']
})
export class NewsDetailsModalComponent implements OnInit {

  //#region variable declaration
  offerId: string = '';
  constant: Constant = new Constant();
  offerDetail: OffersModel = new OffersModel();
  @Output() closeModalPopup: EventEmitter<any> = new EventEmitter()
  @Input() offer_id: any = '';
  //#endregion

  //#region constructor
  
  /**
   * @param route 
   * @param offerService 
   * @param swalService 
   */
  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private swalService: SwalService) { }
  //#endregion

  //#region Methods

  /**
   * The method which will be called after constructor
   */
  ngOnInit(): void {    
    this.getOfferDetail();
  }

  /**
   * Get the offer detail
   */
  getOfferDetail(){
    this.offerId = this.offer_id;
    let requestModel = {
      id: this.offerId
    }
    if(this.offerId){
      this.offerService.getOfferdetail(requestModel,"genrealofferdetail").subscribe((response:ResponseModel)=>{
        if(response.success){
          this.offerDetail = response.data as OffersModel;
        }else{
          this.swalService.error(this.constant.errorTitle,response.message);
        }
      })
    }
  }
  //#endregion

  closeOffer() {
    this.closeModalPopup.emit()
  }
}

