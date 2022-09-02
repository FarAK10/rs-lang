import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as exp from 'constants';
import { HardWords, IWord } from '../interfaces/interfaces';

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

export function filterLearnedWords(array: IWord[]) {
  const filteredArr = array.filter((word) => word?.difficulty !== 'ease');
  return filteredArr;
}

export function isContains(userWords: HardWords[], word: IWord) {
  let result = false;
  const wordId = word?.id ? word.id : word._id;
  userWords.forEach((userWord) => {
    if (userWord.id === wordId) {
      result = true;
    }
  });
  return result;
}
