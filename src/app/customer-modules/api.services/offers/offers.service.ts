import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel } from 'src/app/core/models';
import { BaseService } from 'src/app/core/utils/base.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

/**
 * The offer service
 */
export class OfferService implements OnDestroy {

  //#region variable declaration

  private _subscriptions: Subscription[] = [];
  API_URL = `${environment.apiUrl}`;
  //#endregion

  //#region constructor
  constructor(private http: HttpClient, private baseService: BaseService) {
    if (environment.isSimpleJson) {
      this.API_URL = `${environment.localAPIURL}`;
    } else {
      this.API_URL = `${environment.apiUrl}`;
    }
  }
  //#endregion

  //#region  Methods

  /**
   * The method to get the data of offer
   * @param requestModel 
   * @param endPoint 
   * @returns 
   */

  getOfferList(requestModel: any, endPoint: string): Observable<ResponseModel> {
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

  /**
   * The method to get the categories
   * @param endPoint 
   * @returns 
   */

  getCategories(endPoint: string): Observable<ResponseModel> {
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

  /**
   * The method to get the detail of offer
   * @param requestModel 
   * @param endPoint 
   * @returns 
   */

  getOfferdetail(requestModel: any, endPoint: string): Observable<ResponseModel> {
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


    /**
   * The method to get the detail of offer
   * @param requestModel 
   * @param endPoint 
   * @returns 
   */

     getCorporateOfferdetail(requestModel: any, endPoint: string): Observable<ResponseModel> {
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


    getCorporateOffInq(requestModel: any, endPoint: string): Observable<ResponseModel> {
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

  /**
   * The method to get the populer categories
   * @param endPoint 
   * @returns 
   */

  getPopularCategory(endPoint: string): Observable<ResponseModel> {
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


  /**
 * The method to get the populer categories
 * @param endPoint 
 * @returns 
 */

  getOfferCategory(endPoint: string): Observable<ResponseModel> {
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

  /**
* The method to get the getCorporateOfferCategory
* @param endPoint 
* @returns 
*/

  getCorporateOfferCategory(endPoint: string): Observable<ResponseModel> {
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