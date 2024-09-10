import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HelperService } from '../helpers/helper.service';
import { SwalService } from '../helpers/swal.service';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  //#region Constructor
  constructor(
    private router: Router,
    public helperService: HelperService,
    public swalService: SwalService) { }
  //#endregion

  //#region functions
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      //document.body.classList.remove("loader");
      let error = '';
      if (err.error && err.error.message) {
        error = err.error.message;
      } else {
        error = err.statusText;
      }
      if ([401, 403, 500, 404].indexOf(err.status) !== -1) {
        document.getElementById('preloader').style.display = 'none';
        // if 401 Unauthorized or 403 Forbidden response returned from api
        if (err.status == 403) {
          // this.router.navigate(['403']);
        } else if (err.status == 401) {
          localStorage.clear();

          this.swalService.error('Session Expired', error);

          this.helperService.isLogIn = false;
          this.router.navigate(['/login']);
        } else if (err.status == 500) {
          this.router.navigate(['500']);
        }
        else if (err.status == 404) {
          this.swalService.error('Try again!', error);
          document.getElementById('preloader').style.display = 'none';
        }
      } else {
        //this.swalService.error('Try again!', error);
        document.getElementById('preloader').style.display = 'none';
      }
      return throwError(error);
    }))
  }
  //#endregion

}
