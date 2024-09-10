import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  serachData: any;


  constructor() { }

  ngOnInit(): void {
  }

  searchCategory($event){
    this.serachData = $event;
  }

}
