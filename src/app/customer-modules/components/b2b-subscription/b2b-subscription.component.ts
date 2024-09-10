import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from 'src/app/core/constants/constant';
import { SwalService } from 'src/app/core/helpers/swal.service';
import { ResponseModel, UserModel } from 'src/app/core/models';
import { UserService } from '../../api.services';

@Component({
  selector: 'app-b2b-subscription',
  templateUrl: './b2b-subscription.component.html',
  styleUrls: ['./b2b-subscription.component.scss']
})
export class B2bSubscriptionComponent implements OnInit {

  constant: Constant = new Constant();

  constructor(
    private userService: UserService,
    private swalService: SwalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  submit(data){
        
    this.userService.clients_Inq(data,'company-client-inquiry').subscribe((response) => {
      if (response.success) {                   
        this.swalService.success(this.constant.successTitle, response.message, true);  
        this.router.navigate(['/login']);    
      } else {
        this.swalService.error(this.constant.errorTitle, response.message);
      }
    })

  }
}
