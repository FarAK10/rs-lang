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

  currentPage: number = 1;

  sliceNumber: number = 0;

  correctOption!: IOption;

  options$ = new BehaviorSubject<IOption[]>([]);

  getWords() {
    this.gameService
      .getWords(this.currentPage)
      .pipe(take(1))
      .subscribe((words: IWord[]) => {
        this.allWords = shuffle(words);
        this.sliceNumber = 0;
        this.options$.next(this.getOptions());
      });
  }

  getOptions(): IOption[] {
    let options = this.allWords
      .slice(this.sliceNumber * 5, this.sliceNumber * 5 + 5)
      .map((word: IWord, index: number) => {
        if (index === this.sliceNumber) {
          this.correctOption = this.setClass(word, 'correct');
          return this.correctOption;
        } else {
          return this.setClass(word, 'wrong');
        }
      });
    return shuffle(options);
  }

  checkPage() {
    if (this.sliceNumber < 2) {
      this.sliceNumber++;
      this.options$.next(this.getOptions());
    } else {
      this.currentPage++;
      this.getWords();
    }
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
