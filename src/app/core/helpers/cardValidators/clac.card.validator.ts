import { ValidatorFn, AbstractControl } from '@angular/forms';
import { clackCheck } from '../cardHelpers/clac.helper';

export function luhnValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const isValid = clackCheck(control.value);
    return isValid ? null:  {'clackCheck': isValid};
  };
}