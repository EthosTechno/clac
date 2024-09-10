import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  //#region Private variables

  private readonly API_URL: string = environment.apiUrl;
  //#endregion

  //#region constructor
  
  /**
   * @param http 
   * @param router 
   */
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }
  
  //#endregion

  //#region Methods

  /**
   * The Get method
   * @param url 
   * @param requestParamModel 
   * @returns 
   */
  get(url: string,requestParamModel?:any) {
    const fullURL = this.getURL(url,requestParamModel);
    const headers = this.getHeaders();
    return this.http.get(fullURL, {
      headers: headers,
      observe: 'response'
    });
  }

  /**
   * The post method
   * @param url 
   * @param bodyModel 
   * @returns 
   */
  post(url: string, bodyModel: any) {
    const fullURL = this.getURL(url);
    const headers = this.getHeaders();
    return this.http.post(fullURL, bodyModel, {
      headers: headers
    });
  }

  /**
   * The patch method
   * @param url 
   * @param bodyModel 
   * @returns 
   */
  patch(url: string, bodyModel: any) {
    const fullURL = this.getURL(url);
    const headers = this.getHeaders();
    return this.http.patch(fullURL, bodyModel, {
      headers: headers
    });
  }

  /**
   * The put method
   * @param url 
   * @param bodyModel 
   * @returns 
   */
  put(url: string, bodyModel: any) {
    const fullURL = this.getURL(url);
    const headers = this.getHeaders();
    return this.http.put(fullURL, bodyModel, {
      headers: headers
    });
  }

  /**
   * The delete method
   * @param url 
   * @returns 
   */
  delete(url: string) {
    const fullURL = this.getURL(url);
    const headers = this.getHeaders();
    return this.http.delete(fullURL, {
      headers: headers
    });
  }

  /**
   * The post method without token in the header
   * @param url 
   * @param bodyModel 
   * @returns 
   */
  postWithoutToken(url: string, bodyModel: any) {
    const fullURL = this.getURL(url);
    const headers = this.getHeaders(false);
    return this.http.post(fullURL, bodyModel, {
      headers: headers
    });
  }

  /**
   * The patch methods without token in the header
   * @param url 
   * @param bodyModel 
   * @returns 
   */
  patchWithoutToken(url: string, bodyModel: any) {
    const fullURL = this.getURL(url);
    const headers = this.getHeaders(false);
    return this.http.post(fullURL, bodyModel, {
      headers: headers
    });
  }

  upload(url: string, bodyModel: FormData) {
    const fullURL = this.getURL(url);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.getAccessToken());
    return this.http.post(fullURL, bodyModel, {
      headers: headers
    });
  }

  /**
   * The mehtods which will returns the URL by concating the environment URL.
   * @param url 
   * @param requestParamModel 
   * @returns 
   */
  public getURL(url: string,requestParamModel?: any): string {
    let newURL: string = this.API_URL + url;
    return newURL;
  }

  /**
   * The method which will usedto get the access token
   * @returns Access token
   */
  public getAccessToken(): any {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return token;
    } else {
      ////this.notification.error('Login session expired.');
      this.router.navigate(['/login']);
    }
  }

  /**
   * The methods which will be used to bind the header and return to send in the request
   * @param authorizationHeader 
   * @returns 
   */
  public getHeaders(authorizationHeader: boolean = true): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');
    if (authorizationHeader) {
      headers = headers.append('Authorization', this.getAccessToken());
    }
    return headers;
  }

  /**
   * The header for image
   * @param authorizationHeader 
   * @returns 
   */
  public getHeadersForImage(authorizationHeader: boolean = true): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('Accept', 'application/json');
    //headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    if (authorizationHeader) {
      headers = headers.append('Authorization', this.getAccessToken());
    }
    return headers;
  }

  /**
   * The method which is to be used to get the HTTP Params
   * @param params 
   * @returns 
   */
  public getHttpParams(params:any){
    let httpParams : HttpParams = new HttpParams();
    httpParams = httpParams.append('searchString', params.searchString);
    httpParams = httpParams.append('pageNo', params.pageNo);
    httpParams = httpParams.append('limit', params.limit);
    return httpParams;
  }
  
  //#endregion
}
