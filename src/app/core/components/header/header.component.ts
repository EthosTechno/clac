import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import { HelperService } from '../../helpers/helper.service';
import { SelectItem } from 'primeng/api';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { LoginService } from '../../../customer-modules/api.services/login/login.service';
import { Base64Service } from '../../../core/services/base64-service.service';
import { NotificationService } from 'src/app/customer-modules/api.services/notiification/notification.service';
import { NotificationsModal } from '../../models/notifiaction.modal';
import { document } from 'ngx-bootstrap/utils';


interface LangOption {
  label: string;
  value: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //#region Variable Declaration
  showLoginHeader = true;
  text;
  isUserLoggedIn: boolean = false;
  items: SelectItem[];
  item: string;
  constant: Constant = new Constant();
  role: any;
  email: any;
  user_role: any;
  role_count: number;
  logo: any;
  FAQ: string;
  Recruitment: string;
  Contact: string;
  news: string;
  notificationData = [];
  notificationShow: boolean = false;
  count = '0'
  /**
  * @param translate 
  * @param router 
  * @param helperService 
  */

  constructor(public translate: TranslateService, private router: Router,
    public helperService: HelperService, private LoginService: LoginService,
    private notificationService: NotificationService,
    private swalService: SwalService) {

    this.items = [];
    for (let i = 0; i < 10000; i++) {
      this.items.push({ label: 'Item ' + i, value: 'Item ' + i });
    }
  }

  selectedAccount = "2";
  selectedLang: LangOption;
  flagFr: string = 'assets/images/fr.png';
  flagEn: string = 'assets/images/en.png';
  langOptions: LangOption[] = [
    { label: 'French', value: 'fr' },
    { label: 'English', value: 'en' }
  ];

  account = [
    { label: "Company", values: '3' },
    { label: "Indivisual", values: '2' },
  ];
  //#region Method

  /**
   * The method which will be called after constructor
   */
 
  ngOnInit(): void {
   

    this.notificationService.notifiactionData.subscribe((res)=> {
      this.notificationData = res
    })
    
    var lang = localStorage.getItem("LangOption")
    console.log("first time called");
    
     this.getNotifiacationData();
    if(lang){
      this.changeLanguage(lang)
      this.selectedLang = this.langOptions.find(x => x.value == lang)
    }else{
      this.changeLanguage('fr')
    }
   
    var self = this;
    setInterval(function () {
      if (localStorage.getItem('token')) {
        self.showLoginHeader = false;
      } else {
        self.showLoginHeader = true;
      }
    }, 1000)

    $(function () {
      $(window).on("scroll", function () {
        if ($(window).scrollTop() > 50) {
          $("header .site-new-header").addClass("page-scrolled");
          if ($("#main-menu").hasClass('open-menu')) {
            $('.login-btn').removeClass('white-login-btn');
            $('.hamburger .hamburger-box .hamburger-inner').removeClass('white-hamburger-btn');
          }
        } else {
          $("header .site-new-header").removeClass("page-scrolled");
          if ($("#main-menu").hasClass('open-menu')) {
            $('.login-btn').addClass('white-login-btn');
            $('.hamburger .hamburger-box .hamburger-inner').addClass('white-hamburger-btn');
          } else {
            $('.login-btn').removeClass('white-login-btn');
            $('.hamburger .hamburger-box .hamburger-inner').removeClass('white-hamburger-btn');
          }
        }
      });
    });


           
      setInterval(() =>{           
      if(localStorage.getItem('userdata') != null){ 
        var userdata = JSON.parse(Base64Service.decode(localStorage.getItem('userdata')));
        this.role  = userdata.active_role;  
        this.logo  = userdata.logo;  
        this.email = userdata.email;           
        this.user_role = userdata.user_role;     
        var keys = Object.keys(userdata.user_role);
        this.role_count = keys.length;  
      }
      var lang = localStorage.getItem("LangOption")
      var language = [
        { label: 'French', value: 'fr' },
        { label: 'English', value: 'en' }
      ];
      this.selectedLang = language?.find(x => x.value == lang)
      },1000);      
    
      
      document.addEventListener('mouseup',function(event){
        var pol = document.getElementById('notificationwrap');
        var pol1 = document.getElementById('notificationwrapli')
        if(event.target != pol && event.target != pol1){
            pol.style.display = 'none';
            localStorage.setItem('notification', '0')
        }
      })
    
  }
  
  /**
   * The method which will be used in the mobile view
   */

  mobileToggleClick() {
   $(".mobile-toggler").toggleClass("close");
   $(".menu-wrapper").toggleClass("opened");
  }

  /**
  * The method which will be used to open the menu from the right side
  */
  openMenu() {
    $("#main-menu").toggleClass('open-menu');
    $(".hamburger-box .hamburger-inner").toggleClass('show-close-btn');
    if ($(window).scrollTop() < 50) {
     $('.hamburger .hamburger-box .hamburger-inner').toggleClass('white-hamburger-btn');
     $('.login-btn').toggleClass('white-login-btn');
    }
  }

  /**
   * The method which will be used to change the language
   * @param selectedLanguage 
   */
  changeLanguage(selectedLanguage: string) {
    this.translate.use(selectedLanguage)
    localStorage.setItem("LangOption", selectedLanguage)
    if(selectedLanguage === 'fr'){
      this.FAQ =  'https://clacdesdoigts.com/faq',
      this.Recruitment =  'https://clacdesdoigts.com/consulter-nos-offres',
      this.Contact =  'https://clacdesdoigts.com/contact-b2b',
      this.news =  'https://clacdesdoigts.com/actualites'
    }else if(selectedLanguage === 'en'){
      this.FAQ =  'https://clacdesdoigts.com/en/faq',
      this.Recruitment =  'https://clacdesdoigts.com/en/our-job-offers',
      this.Contact =  'https://clacdesdoigts.com/en/contact-b2b',
      this.news =  'https://clacdesdoigts.com/en/news'
    }
  }

  getNotifiacationData() {
    console.log('notification fn called');
    
    this.notificationService.getNotifiaction('notifications').subscribe(results => {
      if(results.success == false) {
        this.swalService.error(this.constant.errorTitle, results.message);
      }
      else {
       this.notificationData = results.data;
      }
    })
  }

  /**
   * The method to change the text on the mouse hover event
   */
  loginMouseHover() {
    this.translate.get('Login').subscribe((text: string) => {
      this.text = text;
      $("#translateText>span").data("hover", text);
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  //#endregion

  changeAccount($event) {

    var data = {
      email: this.email,
      role: $event
    }

    this.LoginService.login(data, 'user-role-change').subscribe(results => {
            
      if (results.success == false) {
        this.swalService.error(this.constant.errorTitle, results.message);
      } else {
        localStorage.setItem('token', results.data.token);
        var userDetail = JSON.stringify(results.data)
        var encodedUserDetails = Base64Service.encode(userDetail);
        if (encodedUserDetails) {
          localStorage.setItem("userdata", encodedUserDetails);
        }       
        //this.swalService.success(this.constant.successTitle, results.message, true);
        window.location.reload();
        //this.route.navigate(['/customer/home']);        
      }
    }, err => {
      console.log(err);
    });

  }

  notification() {
    this.count = localStorage.getItem('notification')
    if(this.count == '0') {
      document.getElementById('notificationwrap').style.display= 'block' 
      this.count = "1"
      this.notificationShow = true

    }
    else {
      document.getElementById('notificationwrap').style.display= 'none' 
      this.count = "0"
      console.log(this.count)

    }
  }

  deleteNotification(id: string) {
    this.notificationService.deleteNotification(`notifications/${id}`).subscribe(results => {
      if(results.success == false) {
        this.swalService.error(this.constant.errorTitle, results.message);
      }
      else{
        this.notificationService.getNotifiaction('notifications').subscribe(results => {
          if(results.success == false) {
            this.swalService.error(this.constant.errorTitle, results.message);
          }
          else {
           this.notificationData = results.data;
          }
        })
      }
    })
  }
}
