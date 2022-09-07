import { Injectable } from '@angular/core';
import { IOption, IWord } from '../interfaces/interfaces';
import { shuffle } from '../shared/functions';
import { BehaviorSubject, take } from 'rxjs';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class AudioChallengeService {
  constructor(private gameService: GameService) {}
  allWords: Array<IWord> = [];

  currentPage: number = this.gameService.getCurrentPage();

  sliceNumber: number = 0;

  index!: number;

  correctOption!: IOption;

  options$ = new BehaviorSubject<IOption[]>([]);

  getWords() {
    this.gameService.reset();
    this.gameService.getWords();
    this.gameService.isWordsLoaded$.pipe(take(2)).subscribe((isLoaded: boolean) => {
      if (isLoaded) {
        this.allWords = shuffle(this.gameService.gameWords);
        this.index = this.allWords.length - 1;
        this.options$.next(this.getOptions());
      }
    });
  }

  getOptions(): IOption[] {
    const options = [];
    const indexes = [];
    const correctWord = this.allWords[this.index];
    this.correctOption = this.setClass(correctWord, 'correct');
    indexes.push(this.index);
    options.push(this.correctOption);
    for (let i = 0; i < 4; i++) {
      let randomNumber = Math.floor(Math.random() * this.allWords.length);
      while (indexes.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * this.allWords.length);
      }
      indexes.push(randomNumber);
      const randomWord = this.allWords[randomNumber];
      const option = this.setClass(randomWord, 'wrong');
      options.push(option);
    }
    this.index--;
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
}
