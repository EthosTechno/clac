import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { ComplimentModel, ResponseModel } from 'src/app/core/models';
import { EventModel } from 'src/app/core/models/event.modal';
import { SuggestionModel } from 'src/app/core/models/suggestion.modal';
import { MyAccountService } from '../../api.services/myAccount/myaccount.service';
import { Base64Service } from '../../../core/services/base64-service.service';

@Component({
  selector: 'app-corporate-life-history',
  templateUrl: './corporate-life-history.component.html',
  styleUrls: ['./corporate-life-history.component.scss']
})
export class CorporateLifeHistoryComponent implements OnInit {

  constant: Constant = new Constant();
  SuggestionModel: SuggestionModel = new SuggestionModel();
  ComplimentModel: ComplimentModel = new ComplimentModel();
  EventModel: EventModel = new ComplimentModel();
  resetModel = { first: 0, rows: 10, sortField: '', sortOrder: 1, }
  SuggestionHeader: any;
  ComplimentonHeader: any;
  SuggestionDetails: any;
  ComplimentDetail: any;
  SuggestiontotalDocs: any;
  ComplimenttotalDocs: any;
  EventHeader: { field: string; header: string; type: string; display: boolean; isSortable: boolean; }[];
  EventDetail: any;
  EventtotalDocs: any;
  ParticipateEventHeader: { field: string; header: string; type: string; display: boolean; isSortable: boolean; }[];
  ParticipateEventDetail: any;
  ParticipateEventtotalDocs: any;
  EventDetailUserList: any;
  role: any;

  constructor(
    private myAccountService: MyAccountService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {

    var userdata = JSON.parse(Base64Service.decode(localStorage.getItem('userdata')));
    this.role = userdata.active_role;

    this.SuggestionHeader = [
      { field: 'description', header: 'Suggestions', type: 'string', display: true, isSortable: true },
      { field: 'createdAt', header: 'Date', type: 'date', display: true, isSortable: true },
      { field: 'status', header: 'Status', type: 'string', display: true, isSortable: true },
      // { field: '_id', header: 'Action',type:'link',display:true,isSortable:false},
    ];
    this.ComplimentonHeader = [
      { field: 'compliments', header: 'Compliment', type: 'string', display: true, isSortable: true },
      { field: 'sender_user_name', header: 'From', type: 'string', display: true, isSortable: true },
      { field: 'date', header: 'Date', type: 'date', display: true, isSortable: true },
    ];
    this.EventHeader = [
      { field: 'name', header: 'Event Name', type: 'string', display: true, isSortable: true },
      { field: 'date', header: 'Date', type: 'date', display: true, isSortable: true },
      { field: 'time', header: 'Time', type: 'string', display: true, isSortable: true },
      { field: '_id', header: 'Info', type: 'link', display: true, isSortable: false },
    ];

    this.ParticipateEventHeader = [
      { field: 'name', header: 'Event Name', type: 'string', display: true, isSortable: true },
      { field: 'date', header: 'Date', type: 'date', display: true, isSortable: true },
      { field: 'time', header: 'Time', type: 'string', display: true, isSortable: true },
      { field: 'status', header: 'Status', type: 'dropdown', display: true, isSortable: false },
    ];

  }

  onSuggestionLazyLoad($event: LazyLoadEvent) {
    this.getSuggestionDetail($event)
  }

  /**
 * Get the news details
 */
  getSuggestionDetail($event) {

    let page: number = 0;

    if ($event.first !== undefined) {
      if ($event.first === 0) {
        page = 0;
      }
      else {
        page = Math.floor(($event.first)  / $event.rows);
      }
    }

    this.SuggestionModel.limit = $event.rows;
    this.SuggestionModel.page = page + 1;
    this.SuggestionModel.search = this.SuggestionModel.search
    this.SuggestionModel.sortDirection = $event.sortOrder;
    this.SuggestionModel.sortyBy = $event.sortField;

    this.myAccountService.SuggestionDetail(this.SuggestionModel, "suggestion/list").subscribe((response: ResponseModel) => {
      if (response.success) {


        if (response.data) {
          this.SuggestionDetails = response.data.docs;
          this.SuggestiontotalDocs = response.data.totalDocs
        }
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }


  onComplimentLazyLoad($event: LazyLoadEvent) {
    this.getComplimentDetail($event)
  }

  getComplimentDetail($event) {

    let page: number = 0;

    if ($event.first !== undefined) {
      if ($event.first === 0) {
        page = 0;
      }
      else {
        page = Math.floor(($event.first)  / $event.rows);
      }
    }

    this.ComplimentModel.limit = $event.rows;
    this.ComplimentModel.page = page + 1;
    this.ComplimentModel.search = this.ComplimentModel.search
    this.ComplimentModel.sortDirection = $event.sortOrder;
    this.ComplimentModel.sortyBy = $event.sortField;

    this.myAccountService.ComplimentDetail(this.ComplimentModel, "compliment/list").subscribe((response: ResponseModel) => {
      if (response.success) {
        if (response.data) {
          this.ComplimentDetail = response.data.docs;
          this.ComplimenttotalDocs = response.data.totalDocs
        }
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }


  onEventLazyLoad($event: LazyLoadEvent) {
    this.getEventDetail($event)
  }

  getEventDetail($event) {

    let page: number = 0;

    if ($event.first !== undefined) {
      if ($event.first === 0) {
        page = 0;
      }
      else {
        page = Math.floor(($event.first)  / $event.rows);
      }
    }

    this.EventModel.limit = $event.rows;
    this.EventModel.page = page + 1;
    this.EventModel.search = this.EventModel.search
    this.EventModel.sortDirection = $event.sortOrder;
    this.EventModel.sortyBy = $event.sortField;

    this.myAccountService.EventDetail(this.EventModel, "event/myeventlist").subscribe((response: ResponseModel) => {
      if (response.success) {
        if (response.data) {
          this.EventDetail = response.data.docs;
          this.EventtotalDocs = response.data.totalDocs
        }
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  showEventDetails(id: any) {
    var req = {
      id: id
    }
    this.myAccountService.EventMoreDetail(req, "event/event-invite-user-list").subscribe((response: ResponseModel) => {
      if (response.success) {
        if (response.data) {
          this.EventDetailUserList = response.data[0];
          console.log("%%%%%%%%%%", this.EventDetailUserList);
        }
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })

  }


  onEventParticipateLazyLoad($event: LazyLoadEvent) {
    this.getEventParticipateDetail($event)
  }

  getEventParticipateDetail($event) {

    this.EventModel.limit = $event.rows;
    this.EventModel.page = $event.first + 1;
    this.EventModel.search = this.EventModel.search
    this.EventModel.sortDirection = $event.sortOrder;
    this.EventModel.sortyBy = $event.sortField;

    this.myAccountService.EventDetail(this.EventModel, "event/participateeventlist").subscribe((response: ResponseModel) => {
      if (response.success) {
        if (response.data) {
          console.log("@#@#@#@##@", response.data);
          this.ParticipateEventDetail = response.data.docs;
          this.ParticipateEventtotalDocs = response.data.totalDocs
        }
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })
  }

  updateEventStatus(status: any, id: any) {

    var req = { id: id, status: status }
    this.myAccountService.EventStatusUpdate(req, "event/statusupdate").subscribe((response) => {
      if (response.success) {
        this.swalService.success(this.constant.successTitle, response.message, true);
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })

  }

}
