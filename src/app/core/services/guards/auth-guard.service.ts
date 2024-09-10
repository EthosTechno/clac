import { Injectable, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { HelperService } from '../../helpers/helper.service';
// import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router,
    // private model:NgbModal,
    public helperService: HelperService)
  {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){    

    if(localStorage.getItem('token')){
      this.helperService.isLogIn = true;
      return true;
    }
    else{
      this.helperService.isLogIn = false;
      localStorage.clear();
      this.router.navigate(['/login']);
      // this.model.open(LoginpopupComponent,{centered:true,windowClass:'login-modal in'})
      return false;
    }
    localStorage.setItem('returnUrl', JSON.stringify(state.url));
  }

}
