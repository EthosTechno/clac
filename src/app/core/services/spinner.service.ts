import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * The spinner service which will be called on each request of the website
 * Once it is the http request will be called then fro this service the isLoading flag will chage its value
 * and based on that it will show the loader bar
 */
export class SpinnerService {

  // A BehaviourSubject is an Observable with a default value
  public isLoading = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  show() {
    this.isLoading.next(true);
    localStorage.setItem("loader","true");
  }
  hide() {
    this.isLoading.next(false);
    localStorage.setItem("loader","false");
  }
}