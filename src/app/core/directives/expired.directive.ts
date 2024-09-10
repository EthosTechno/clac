import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, ValidationErrors, Validator, FormGroup } from '@angular/forms';

@Directive({
  selector: '[checkExpired]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CheckExpiredDirective, multi: true }]
})

export class CheckExpiredDirective implements Validator {
  @Input("checkExpired") checkExpired: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors {
    return checkDateIsExpired(this.checkExpired[0])(formGroup);
  }
}

export function checkDateIsExpired(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    // return null if controls haven't initialised yet
    if (!control) {
      return null;
    }

    // return null if another validator has already found an error on the matchingControl
    if (control.errors && !control.errors?.['checkExpired']) {
      return null;
    }

    // if (control.value && control.value.match(/^(0\d|1[0-2])\/\d{2}$/)) {

    // get midnight of first day of the next month
    let expiry = 0;
    for(var i=0;i<control.value.length;i++){
      expiry = expiry + +control.value[i];
    }

    const current = new Date();
    var currentYearLastTwoDigits = current.getFullYear() % 100;
    var currentMonth = current.getMonth() + 1;
    var currentDate = currentMonth.toString()+currentYearLastTwoDigits.toString();
    let currentDateAsSum = 0;
    for(var i=0;i<currentDate.length;i++){
      currentDateAsSum = currentDateAsSum + +currentDate[i];
    }

    

    //const expiry = new Date( 20 + +year, +month);
   

    if (expiry > currentDateAsSum) {
      control.setErrors(null);
    } else {
      control.setErrors({ checkExpired: true });
    }
  }
}
//}