import { HttpBackend, HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel } from 'src/app/core/models';
import { BaseService } from 'src/app/core/utils/base.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {

  private _subscriptions: Subscription[] = [];
  API_URL = `${environment.apiUrl}`;

  private notifiaction = new BehaviorSubject<any>([]);
  notifiactionData = this.notifiaction.asObservable();

  addnotification(data){
    this.notifiaction.next(data);
  }

    /**
   * The method to get the news of user
   * @param requestModel 
   * @param endPoint 
   * @returns 
   */
    private httpClient: HttpClient;
   constructor(private baseService: BaseService, private handler: HttpBackend) {
       this.httpClient = new HttpClient(handler);
      if(environment.isSimpleJson){
        this.API_URL = `${environment.localAPIURL}`;
      }else{
        this.API_URL = `${environment.apiUrl}`;
      }
    }

    getNotifiaction(endPoint: any) {
      let headers = this.baseService.getHeaders(true);    
      return this.httpClient.get<any>(this.API_URL + endPoint,{ headers: headers }).pipe(
        map((response: any) => {
          return response;
        })
      );
    }

    deleteNotification(endPoint: any) {
      let headers = this.baseService.getHeaders(true);
      return this.httpClient.delete<any>(this.API_URL+ endPoint, { headers: headers}).pipe( 
        map((response: any) => {
          return response;
        })
      )
    }

    get subscriptions() {
      return this._subscriptions;
    }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
