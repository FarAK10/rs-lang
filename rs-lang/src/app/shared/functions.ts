import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IWord } from '../interfaces/interfaces';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true,
      };
    }
    return null;
  };
}

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [
      array[currentIndex],
      array[randomIndex],
    ] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
