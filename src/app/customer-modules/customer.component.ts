import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constant } from '../core/constants/constant';
import { SwalService } from '../core/helpers/swal.service';
import { CustomerHomeService } from './api.services/customer-home/customerhome.service';
import { ResponseModel } from 'src/app/core/models';
import { Base64Service } from '../core/services/base64-service.service';
import { SwiperComponent } from "../../../node_modules/swiper/angular";
import SwiperCore, { SwiperOptions, Autoplay, Pagination, Navigation } from '../../../node_modules/swiper';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DomSanitizer } from '@angular/platform-browser';
import { ThrowStmt } from '@angular/compiler';

SwiperCore.use([Pagination, Navigation, Autoplay]);
declare var $: any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  offerSlideItems: any;
  newsSliderItems: any;
  customerHomeData: any;
  offerData: any;
  newsData: any;
  private innerWidth: any;
  private mobileBreakpoint = 480;
  private tabletBreakpoint = 768;
  private tabletBreakpoint2 = 991;
  constant: Constant = new Constant();
  role: any;

  @ViewChild('iframe') iframe: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtnCom') closeBtnCom: ElementRef;
  @ViewChild('closeBtnModal') closeBtnModal: ElementRef;

  offerdetails: boolean = false;
  offer_id: number;
  newDtails: any;
  orderData: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  empData: any;
  ComplimentData: any;
  cmpList: any = [];
  url: string;
  safeURL: any;
  title: any;
  date: any;
  email: any;
  suggestionbox_tooltip:any;
  email_lang: any;
  // description: any;
  suggestion_type: any;
  emilList: any = [];
  EmpList: any = [];
  constructor(private route: ActivatedRoute, private swalService: SwalService,
    public customerHomeService: CustomerHomeService, private _sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {

    var userdata = JSON.parse(Base64Service.decode(localStorage.getItem('userdata')));
    console.log('userdata',userdata)
    this.role = userdata.active_role;
    this.suggestionbox_tooltip = userdata.suggestion_box_tooltip;

    console.log(this.suggestionbox_tooltip)
    console.log('suggestionbox_tooltip',this.suggestionbox_tooltip)
    this.email_lang = localStorage.getItem("LangOption");
    console.log("lang---", this.email_lang)
    this.adjustOfferSliderItem();
    this.adjustNewsSliderItem();
    this.getcustomerHomeDetail();
    this.getOfferDetail();

    if (this.role != 2) {
      this.getNewsDetails();
      this.getOrderDetails();

      if (this.role == 3 || this.role == 4) {
        this.getEmpDetails();
      }
      if (this.role == 5 || this.role == 6) {
        this.getClientDetails();
      }

      this.getCompliment();
    }

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'user_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  }



  private adjustOfferSliderItem() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= this.mobileBreakpoint) {
      this.offerSlideItems = 1;
    } else if (this.innerWidth <= this.tabletBreakpoint) {
      this.offerSlideItems = 2;
    } else if (this.innerWidth <= this.tabletBreakpoint2) {
      this.offerSlideItems = 3;
    } else {
      this.offerSlideItems = 4;
    }
  }

  private adjustNewsSliderItem() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= this.mobileBreakpoint) {
      this.newsSliderItems = 1;
    } else if (this.innerWidth <= this.tabletBreakpoint2) {
      this.newsSliderItems = 2;
    } else {
      this.newsSliderItems = 3;
    }
  }

  /**
 * Get the offer detail
 */
  getcustomerHomeDetail() {

    this.customerHomeService.getCustomerHomeDetail("setting-home-page/homesetting").subscribe((response: ResponseModel) => {
      if (response.success) {
        this.customerHomeData = response.data;
        console.log(response.data)
        var link = "https://www.youtube.com/embed/";
        var code = this.customerHomeData.setting_homepage_video_link.split('=');
        var videoLink = link + code[0];
        console.log('videoLink', code)
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(videoLink);
        //  this.safeURL = "https://drive.google.com/file/d/1CNWlG25XOMAIqszLx-nL4FQFLWyvvHm8/preview"
        console.log('iframe',this.safeURL)
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  getOfferDetail() {
    this.customerHomeService.getOfferDetail("homepageoffer/list").subscribe((response: ResponseModel) => {
      if (response.success) {
        this.offerData = response.data;

      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }


  getNewsDetails() {
    this.customerHomeService.getNewsDetail("home/news").subscribe((response: ResponseModel) => {
      if (response.success) {
        this.newsData = response.data;

      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  getOrderDetails() {
    this.customerHomeService.getOrderDetail("setting-home-page/homeordersectionsetting").subscribe((response: ResponseModel) => {
      if (response.success) {
        this.orderData = response.data;
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  getCompliment() {
    this.customerHomeService.getComplimentDetail("compliment/complimentlist").subscribe((response: ResponseModel) => {
      if (response.success) {
        this.ComplimentData = response.data;
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  getEmpDetails() {
    this.customerHomeService.getEmpDetail("company-employee/list").subscribe((response: ResponseModel) => {
      if (response.success) {
        this.empData = response.data;
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  getClientDetails() {
    this.customerHomeService.getEmpDetail("company-client/list").subscribe((response: ResponseModel) => {
      if (response.success) {
        this.empData = response.data;
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  ComplimentSubmit(data: any) {

    var items = Object.values(data.cmpList);
    if (items.length > 0) {
      this.EmpList = items.map(item => { return item['user_id'] });
    }

    var other = data.other_mail;

    if (other != null) {
      data.other_mail = other.split(',');
    } else {
      data.other_mail = '';
    }

    var reqData = {
      compliment_list_id: data.compliment_list_id,
      receiver_user_id: this.EmpList,
      email_lang: this.email_lang, 
      other_mail: data.other_mail
    }

    this.customerHomeService.getComplimentAdd(reqData, "compliment/create").subscribe((response: ResponseModel) => {
      if (response.success) {
        this.cmpList = [];
        this.closeBtnCom.nativeElement.click();
        this.swalService.success(this.constant.successTitle, response.message, true);
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  onItemSelect(items: any) {
    this.cmpList.push(items.user_id);      
  }

  onSelectAll(items: any) {
    if (items.length > 0) {
      this.cmpList = items.map(item => { return item.user_id });
      //this.EmpList = this.cmpList;           
    }
  }

  suggestionFormSubmit(data: any) {
    this.customerHomeService.SuggestionAdd(data, "suggestion/create").subscribe((response: ResponseModel) => {
      if (response.success) {
        this.closeBtn.nativeElement.click();
        this.swalService.success(this.constant.successTitle, response.message, true);
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  eventSubmit(data: any) {

    var items = Object.values(data.cmpList);
    if (items.length > 0) {
      this.EmpList = items.map(item => { return item['user_id'] });
    }

    data.participated_id = this.EmpList;
    var other = data.other_mail;

    if (other != null) {
      data.other_mail = other.split(',');
    } else {
      data.other_mail = '';
    }

    this.customerHomeService.EventAdd(data, "event/create").subscribe((response: ResponseModel) => {
      if (response.success) {
        this.closeBtnModal.nativeElement.click();
        this.cmpList = [];
        this.swalService.success(this.constant.successTitle, response.message, true);
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }


  showDetails(id: any) {
    this.offerdetails = true;
    this.offer_id = id;
  }

  closeModalPopup() {
    this.offerdetails = false;
  }

  showNewsDetails(news) {
    this.newDtails = news;
  }
  // testimonial slider config
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: true,
    centeredSlides: true,
    pagination: false
  };
}
