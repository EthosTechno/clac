import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel } from 'src/app/core/models';
import { BaseService } from 'src/app/core/utils/base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

/**
 * The offer service
 */
export class MyAccountService implements OnDestroy {

  //#region variable declaration

  private _subscriptions: Subscription[] = [];
  API_URL = `${environment.apiUrl}`;
  //#endregion

  //#region constructor
  constructor(private http: HttpClient, private baseService: BaseService) {
    if(environment.isSimpleJson){
      this.API_URL = `${environment.localAPIURL}`;
    }else{
      this.API_URL = `${environment.apiUrl}`;
    }
  }
  //#endregion

  //#region  Methods


  /**
   * The method to get the detail of offer
   * @param requestModel 
   * @param endPoint 
   * @returns 
   */

    /**
 * Save service category
 * @param handlerError 
 */
  changePassword(requestModel: any, endPoint: any) {
    let headers = this.baseService.getHeaders(true);       
    return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }


  empAdd(requestModel: any, endPoint: any) {
    let headers = this.baseService.getHeaders(false);       
    return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }


  addClient(requestModel: any, endPoint: any) {
        let headers = this.baseService.getHeaders(true);       
        return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
          map((response: any) => {
            return response;
        })
     );
  }

  SuggestionDetail(requestModel: any, endPoint: any) {
    let headers = this.baseService.getHeaders(true);       
    return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }


  ComplimentDetail(requestModel: any, endPoint: any) {
    let headers = this.baseService.getHeaders(true);       
    return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  EventDetail(requestModel: any, endPoint: any) {
    let headers = this.baseService.getHeaders(true);       
    return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  EventStatusUpdate(requestModel: any, endPoint: any) {
    let headers = this.baseService.getHeaders(true);       
    return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  EventMoreDetail(requestModel: any, endPoint: any) {
    let headers = this.baseService.getHeaders(true);       
    return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getClientDetail(requestModel: any, endPoint: any) {
    let headers = this.baseService.getHeaders(true);       
    return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }


  getFecturesDetails(endPoint: any) {
    let headers = this.baseService.getHeaders(false);       
    return this.http.get<any>(this.API_URL + endPoint,{ headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getIdeaBox(requestModel: any,endPoint: any) {
    let headers = this.baseService.getHeaders(true);
    return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }


  /**
   * 
   * @param handlerError 
   */
  handlerError(
    handlerError: any
  ): import('rxjs').OperatorFunction<Object, any> {
    throw new Error('Method not implemented.');
  }

  /**
   * The get method to get the subscriptions
   */
  get subscriptions() {
    return this._subscriptions;
  }

  /**
   * The destroy function
   */
  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  //#endregion
}