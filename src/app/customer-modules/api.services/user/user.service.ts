import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel } from 'src/app/core/models';
import { BaseService } from 'src/app/core/utils/base.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

/**
 * The user service
 */
export class UserService implements OnDestroy {

  //#region variable declaration
  public message = new Subject<string>();
  public message1 = new Subject<string>();

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
   * The methods which is used to get all the data of based on the request
   * @param requestModel 
   * @param endPoint 
   * @returns 
   */
  getAllRecords(requestModel: any, endPoint: string): Observable<ResponseModel> {
    if (environment.isSimpleJson) {
      return this.baseService.get('assets/jsonData/' + endPoint)
        .pipe(map<HttpResponse<any>, any>(response => {
          return response.body;
        }));
    }
    else {
      let headers = this.baseService.getHeaders(true);
      return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
        map((response: any) => {
          return response;
        })
      )
    }
  };

  /**
   * The method to get the data of user
   * @param requestModel 
   * @param endPoint 
   * @returns 
   */

  getUserDetail(endPoint: string): Observable<ResponseModel> {
    if (environment.isSimpleJson) {
      return this.baseService.get('assets/jsonData/' + endPoint + '.json')
        .pipe(map<HttpResponse<any>, any>(response => {
          return response.body;
        }));
    }
    else {
      let headers = this.baseService.getHeaders(true);
      return this.http.get<any>(this.API_URL + endPoint, { headers: headers }).pipe(
        map((response: any) => {
          return response;
        })
      )
    }
  }
  
  cancelPlan(requestModel:any,endPoint:any) {
    let headers = this.baseService.getHeaders(true);
      return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
        map((response: any) => {
          return response;
        })
    );
  }

  clients_Inq(requestModel:any,endPoint:any) {
    let headers = this.baseService.getHeaders(false);
      return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
        map((response: any) => {
          return response;
        })
    );
  }

   /**
   * The profile image upload called from my account service
   * @param requestModel 
   * @param endPoint 
   * @returns 
   */
    profile_image(requestModel:any,endPoint:any) {
      let headers = this.baseService.getHeaders(true);
        return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
          map((response: any) => {
            return response;
          })
      );
    }

  setMessage(value: string) {
    this.message.next(value);
    //it is publishing this value to all the subscribers that have already subscribed to this message
  }
  setMessage1(value: string) {
    this.message1.next(value);
    //it is publishing this value to all the subscribers that have already subscribed to this message
  }
  /**
   * The methods to get the sucntiption plan details
   * @param requestModel 
   * @param endPoint 
   * @returns 
   */
  getSubscriptionDetail(requestModel: any, endPoint: string): Observable<ResponseModel> {
    if (environment.isSimpleJson) {
      return this.baseService.get('assets/jsonData/' + endPoint + '.json')
        .pipe(map<HttpResponse<any>, any>(response => {
          return response.body;
        }));
    }
    else {
      let headers = this.baseService.getHeaders(true);
      return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
        map((response: any) => {
          return response;
        })
      )
    }
  }


  getSubscriptionPlanDetail(endPoint: string): Observable<ResponseModel> {
    if (environment.isSimpleJson) {
      return this.baseService.get('assets/jsonData/' + endPoint + '.json')
        .pipe(map<HttpResponse<any>, any>(response => {
          return response.body;
        }));
    }
    else {
      let headers = this.baseService.getHeaders(true);
      return this.http.get<any>(this.API_URL + endPoint, { headers: headers }).pipe(
        map((response: any) => {
          return response;
        })
      )
    }
  }

  getSubscriptionPlanSummary(endPoint: string): Observable<ResponseModel> {
    if (environment.isSimpleJson) {
      return this.baseService.get('assets/jsonData/' + endPoint + '.json')
        .pipe(map<HttpResponse<any>, any>(response => {
          return response.body;
        }));
    }
    else {
      let headers = this.baseService.getHeaders(true);
      return this.http.get<any>(this.API_URL + endPoint, { headers: headers }).pipe(
        map((response: any) => {
          return response;
        })
      )
    }
  }

  
  SubscriptionPlanUpdate(requestModel: any, endPoint: string): Observable<ResponseModel> {
    let headers = this.baseService.getHeaders(true);
    return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    )
  };

    /**
   * The method to get the data of user
   * @param requestModel 
   * @param endPoint 
   * @returns 
   */

     getReportDoc(requestModel: any, endPoint: string): Observable<ResponseModel> {
      let headers = this.baseService.getHeaders(true);
      return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
        map((response: any) => {
          return response;
        })
      )
    };

  /**
   * Save business records while save and edit bith
   * @param requestModel 
   * @param endPoint 
   * @returns 
   */
  saveRecords(requestModel: any, endPoint: string): Observable<ResponseModel> {
    let headers = this.baseService.getHeaders(true);
    return this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    )
  };

  /**
   * The reset password method which will be called from my account service
   * @param requestModel 
   * @param endPoint 
   * @returns 
   */
   reset_password(requestModel:any,endPoint:any) {
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


  getstripeUserRegisterWebhook(endPoint: string): Observable<ResponseModel> {
    if (environment.isSimpleJson) {
      return this.baseService.get('assets/jsonData/' + endPoint + '.json')
        .pipe(map<HttpResponse<any>, any>(response => {
          return response.body;
        }));
    }
    else {
      let headers = this.baseService.getHeaders(true);
      return this.http.get<any>(this.API_URL + endPoint, { headers: headers }).pipe(
        map((response: any) => {
          return response;
        })
      )
    }
  }

  updatestripeUserRegisterWebhook(requestModel: any, endPoint: any){
    debugger
      let headers = this.baseService.getHeaders(true);
      var httpMethod: any;
        httpMethod = this.http.post<any>(this.API_URL + endPoint, requestModel, { headers: headers })
      
      return httpMethod.pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  //#endregion
}