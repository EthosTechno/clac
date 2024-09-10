import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  
  //#region variable delcaration
    year: number = 0;
    showLoginFooter : boolean = true;
  //#endregion
  
  //#region constructor
    constructor() { }
  //#endregion

  //#region methods
  ngOnInit(): void {
    let currentDate = new Date();
    this.year = currentDate.getFullYear();
    var self = this;
    setInterval(function(){
      if(localStorage.getItem('token')){
          self.showLoginFooter = false;
      }else{
          self.showLoginFooter = true;
      }
    },1000)
  }
   //#endregion

}
