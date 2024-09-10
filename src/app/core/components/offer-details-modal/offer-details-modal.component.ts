import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { OffersModel, ResponseModel } from 'src/app/core/models';
import { OfferService } from 'src/app/customer-modules/api.services';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-offer-details-modal',
  templateUrl: './offer-details-modal.component.html',
  styleUrls: ['./offer-details-modal.component.scss']
})
export class OfferDetailsModalComponent implements OnInit {
  thumbsSwiper: any;
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
  getOfferDetail() {
    this.offerId = this.offer_id;
    let requestModel = {
      id: this.offerId
    }
    if (this.offerId) {
      this.offerService.getOfferdetail(requestModel, "genrealofferdetail").subscribe((response: ResponseModel) => {
        if (response.success) {
          this.offerDetail = response.data as OffersModel;
          console.log("this.offerDetail", this.offerDetail)
        } else {
          this.swalService.error(this.constant.errorTitle, response.message);
        }
      })
    }
  }
  //#endregion

  closeOffer() {
    this.closeModalPopup.emit()
  }
}

