import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Subscriber, Subscription } from 'rxjs';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { NewsModel, ResponseModel } from 'src/app/core/models';
import { NewsService } from '../../api.services';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  //#region Variable declaration
  constant: Constant = new Constant();
  newsModel: NewsModel = new NewsModel();
  websitePattern = "";
  img: File;
  imgShow: string | ArrayBuffer;
  newsDetails: any;
  users: { id: string; name: string; email: string; }[];
  cols: any;
  totalDocs: any;
  image: any;
  resetModel = {
    first: 0,
    rows: 10,
    sortField: '',
    sortOrder: 1,
  }

  @ViewChild('ModalClose') ModalClose: ElementRef;

  //#region constructor
  /**
   * @param newsService 
   * @param swalService 
   */
  constructor(private newsService: NewsService, private swalService: SwalService, private router: Router) { }
  //#endregion

  //#region methods

  ngOnInit(): void {
    this.websitePattern = this.constant.webSitePattern;
    this.cols = [
      { field: 'image', header: 'Image', type: 'image', display: true, isSortable: false },
      { field: 'title', header: 'Title', type: 'string', display: true, isSortable: true },
      { field: 'link', header: 'link', type: 'string', display: true, isSortable: true },
      { field: 'status', header: 'Status', type: 'string', display: true, isSortable: true },
      { field: '_id', header: 'Action', type: 'link', display: true, isSortable: true },
    ];
  }


  onLazyLoad($event: LazyLoadEvent) {
    this.getNewsDetail($event)
  }

  /**
   * Get the news details
   */
  getNewsDetail($event) {

    let page: number = 0;

    if ($event.first !== undefined) {
      if ($event.first === 0) {
        page = 0;
      }
      else {
        page = Math.floor(($event.first)  / $event.rows);
      }
    }

    this.newsModel.limit = $event.rows;
    this.newsModel.page = page + 1;
    this.newsModel.search = this.newsModel.search
    this.newsModel.sortDirection = $event.sortOrder;
    this.newsModel.sortyBy = $event.sortField;

    this.newsService.getNewsDetail(this.newsModel, "news/list").subscribe((response: ResponseModel) => {
      if (response.success) {
        if (response.data) {
          this.newsDetails = response.data.docs;
          this.totalDocs = response.data.totalDocs
        }
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  /**
   * The methods which is used to save the records
   */
  submit() {
    var requestModel = {
      title: this.newsModel.title,
      link: this.newsModel.link,
      description: this.newsModel.articleText,
      image: this.imgShow,
      status: 'Publish'
    }

    this.newsService.getNewsAdd(requestModel, "news/create").subscribe((response: ResponseModel) => {
      if (response.success) {
        this.swalService.success(this.constant.successTitle, response.message, true);
        this.imgShow = '';
        this.ModalClose.nativeElement.click();
        this.getNewsDetail(this.resetModel);
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  deleteRecord(id: any) {

    /**
 * delete the employee
 * @param employeeId 
 */

    var that = this;

    this.swalService.confirm(this.constant.confirmTitle, this.constant.confirmTextToDeleteNews, true, this.constant.confirmButtonText).then(function (response) {
      if (response.isConfirmed) {

        var requestModel = {
          id: id
        }

        that.newsService.getNewsDelete(requestModel, "news/delete").subscribe((response: ResponseModel) => {
          if (response.success) {
            that.swalService.success(that.constant.successTitle, response.message, true);
            that.getNewsDetail(that.resetModel);
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
   * Profile upoad function 
   * @param event 
  **/

  onFileChanged(event) {
    this.img = event.target.files[0];

    if (this.img != undefined) {

      /*** FILE VALID EXT ***/
      let filename = event.target.files[0].name;
      let ext = filename.substring(filename.lastIndexOf('.') + 1);
      if (ext.toLowerCase() != 'png' && ext.toLowerCase() != 'jpg' && ext.toLowerCase() != 'jpeg') {
        this.swalService.error(this.constant.errorTitle, this.constant.fileFormatNotSupported);
        return false;
      }

      /*** FILE VALID SIZE ***/
      if (this.img.size / 1024 / 1024 > 2) {
        this.swalService.error(this.constant.errorTitle, this.constant.fileIsLarge);
        return false;
      }

      /** UPLOAD IMAGE **/
      var reader = new FileReader();
      reader.readAsDataURL(this.img);
      reader.onload = (_event) => {
        this.imgShow = reader.result;

        //// CALL API FOR UPLOAD PROFILE IMAGE ////
        var requestParams = {
          profile_image: this.imgShow,
        }

      }
    } else {
      this.swalService.error(this.constant.tryAgainTitle, this.constant.tryAgainMessage);
      return false;
    }
    return false;

  }

  //#endregion

}
