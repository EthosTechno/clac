import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

/**
 * This is the service which we make for Swal related function
 * to avoid the multiline code in each components whenever it is needed.
 */
export class SwalService{

  constructor() { }

//#region Sweet Alert methods

  /**
   * This method will open a confirm box when you do something like delete
   * @param title 
   * @param textMsg 
   * @param showCancelButton 
   * @param confirmButtonText 
   * @returns 
   */
  confirm(title:string, textMsg:string,showCancelButton:boolean,confirmButtonText:string):Promise<SweetAlertResult<any>>{
    return Swal.fire({
      title: title,//'Are you sure?',
      text: textMsg,//"You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: showCancelButton,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText
    })
  }

  /**
   * This method will open a box with question icon when you do something
   * @param title 
   * @param textMsg 
   * @param showCancelButton 
   * @param confirmButtonText 
   * @returns 
   */
  question(title:string, textMsg:string,showCancelButton:boolean,confirmButtonText:string):Promise<SweetAlertResult<any>>{
    return Swal.fire({
      title: title,//'Are you sure?',
      text: textMsg,//"You won't be able to revert this!",
      icon: 'question',
      showCancelButton: showCancelButton,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText
    })
  }

  /**
   * This method will open a box with info icon when you do something
   * @param title 
   * @param textMsg 
   * @param showCancelButton 
   * @param confirmButtonText 
   * @returns 
   */
  info(title:string, textMsg:string,showCancelButton:boolean,confirmButtonText:string):Promise<SweetAlertResult<any>>{
    return Swal.fire({
      title: title,//'Are you sure?',
      text: textMsg,//"You won't be able to revert this!",
      icon: 'info',
      showCancelButton: showCancelButton,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      timer: 1500
    })
  }

  /**
   * This method will open a box with error icon when you have an error in the result
   * @param title 
   * @param textMsg 
   * @param showCancelButton 
   * @returns 
   */
  error(title:string, textMsg:string):Promise<SweetAlertResult<any>>{
    return Swal.fire({
      icon: 'error',
      title: title,
      text: textMsg
    })
  }

  /**
   * This method will open a box with success icon when you have an success in the result
   * @param title 
   * @param textMsg 
   * @param showConfirmButton 
   * @returns 
   */
  success(title:string, textMsg:string,showConfirmButton:boolean):Promise<SweetAlertResult<any>>{
    return Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: showConfirmButton,
      text:textMsg,
      timer: 2000
    })
  }

  //#endregion
}
