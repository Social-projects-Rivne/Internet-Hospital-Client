import { Directive } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { PASSPORT_AGE } from '../config';

@Directive({
  selector: '[appDateValidator]'
})
export class DateValidatorDirective {

  constructor() { }

}

export function MaxDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const dateRequirement = new Date().getFullYear() - new Date(control.value).getFullYear();
  if (control.value == null || dateRequirement < PASSPORT_AGE || dateRequirement > 140) {
    return { 'date': true };
  }
  return null;
}
