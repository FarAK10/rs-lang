import { Injectable } from '@angular/core';
import { IOption, IWord } from '../interfaces/interfaces';
import { shuffle } from '../shared/functions';
import { BehaviorSubject, take } from 'rxjs';
import { GameService } from './game.service';
import { resourceUsage } from 'process';

@Injectable({
  providedIn: 'root',
})
export class AudioChallengeService {
  constructor(private gameService: GameService) {}
  allWords: Array<IWord> = [];

  optionalAnswers: Array<IWord> = [];

  currentPage: number = this.gameService.getCurrentPage();

  sliceNumber: number = 0;

  index!: number;

  correctOption!: IOption;

  options$ = new BehaviorSubject<IOption[]>([]);

  isFinished$ = new BehaviorSubject(20);

  getWords() {
    this.gameService.reset();
    this.gameService.getWords();
    this.gameService.isWordsLoaded$.pipe(take(2)).subscribe((isLoaded: boolean) => {
      if (isLoaded) {
        this.allWords = shuffle(this.gameService.gameWords);
        this.optionalAnswers = this.gameService.optionalAnswers.filter((n1) => {
          console.log(n1);
          let result = true;
          this.allWords.forEach((n2) => {
            console.log(n2._id);
            if (n1._id === n2._id) {
              result = false;
            }
          });
          return result;
        });
        console.log(this.optionalAnswers);
        this.index = this.allWords.length - 1;

        this.options$.next(this.getOptions());
      }
    });
  }

  getOptions(): IOption[] {
    this.isFinished$.next(this.index);
    const options = [];
    const indexes = [];
    const correctWord = this.allWords[this.index];
    this.correctOption = this.setClass(correctWord, 'correct');
    indexes.push(this.index);
    options.push(this.correctOption);
    console.log(indexes, 'indexes');
    for (let i = 0; i < 4; i++) {
      let randomNumber;
      if (this.allWords.length > 5) {
        randomNumber = Math.floor(Math.random() * this.allWords.length);
      } else {
        randomNumber = Math.floor(Math.random() * this.optionalAnswers.length);
      }
      while (indexes.includes(randomNumber)) {
        if (this.allWords.length > 5) {
          randomNumber = Math.floor(Math.random() * this.allWords.length);
        } else {
          randomNumber = Math.floor(Math.random() * this.optionalAnswers.length);
        }
      }
      indexes.push(randomNumber);
      let randomWord;
      if (this.allWords.length > 5) {
        randomWord = this.allWords[randomNumber];
      } else {
        randomWord = this.optionalAnswers[randomNumber];
      }
      const option = this.setClass(randomWord, 'wrong');
      options.push(option);
    }
    console.log(this.index);
    this.index--;
    console.log(options);
    return shuffle(options);
  }

  nextQuestion() {
    this.options$.next(this.getOptions());
  }

  setClass(obj: IWord, className: string): IOption {
    return {
      word: obj,
      class: className,
    };
  }
  getCorrectWord(): IWord {
    return this.correctOption.word;
  }

  isExist(word: IWord) {
    let exist = false;
    this.optionalAnswers.forEach((n) => {
      if (word._id === n._id) {
        exist = true;
      }
    });
  }
}
