import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptorService implements HttpInterceptor {

  //#region variables
  private requests: HttpRequest<any>[] = [];
  //#endregion

  //#region Constructor
  constructor(private loaderService: SpinnerService) { }
  //#endregion

  //#region functions
  /**
   * remove request
   * @param req 
   */
  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);

    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  /**
   * intercept
   * @param req 
   * @param next 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(document.getElementById('preloader')){
      document.getElementById('preloader').style.display = 'block';
    }
    
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          setTimeout(() => {
            if(document.getElementById('preloader')){
              document.getElementById('preloader').style.display = 'none';
            }  
          }, 1000);
          
          setTimeout(() => {
            this.loaderService.hide();
          }, 1000);          
        }
        return event; 
      })
      );
  }
  //#endregion
}
