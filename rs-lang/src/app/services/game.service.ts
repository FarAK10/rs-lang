import { IfStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  flatMap,
  from,
  mergeMap,
  observable,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';
import { IAggregatedResp, HardWords, IWord } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { AuthorizationService } from './authorization.service';
import { LocalStorageService } from './local-storage.service';
import { filterLearnedWords, isContains, shuffle } from '../shared/functions';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  aggreagatedWords: Array<IWord> = [];

  englishLevel: string = '5';

  currentPage: number = 30;

  wordsPerPage: number = 20;

  userId!: string;

  correctAnswers: Array<IWord> = [];

  incorrectAnswers: Array<IWord> = [];

  correctWord: string = '';

  isLaunchedFromMenu = true;

  currentGame$ = new BehaviorSubject<string>('');

  gameWords: IWord[] = [];

  userWords: HardWords[] = [];

  isWordsLoaded$ = new BehaviorSubject(true);

  constructor(
    private apiService: ApiService,
    private authService: AuthorizationService,
    private localStorageService: LocalStorageService,
  ) {}

  getWords() {
    this.authService.setHardWords();
    this.userId = this.authService.getUserId();
    this.setUserWords();
    this.isWordsLoaded$.next(false);
    if (this.authService.isAuth) {
      this.getAuthorizedWords();
    } else {
      this.getUnauthorizedWords();
    }
  }

  getUnauthorizedWords() {
    this.gameWords = [];
    const urls = [];
    for (let i = 0; i <= this.currentPage; i++) {
      const url = `words?group=${this.englishLevel}&page=${i}`;
      urls.push(url);
    }
    of(...urls)
      .pipe(
        mergeMap((url) => this.apiService.get<IWord[]>(url)),
        take(this.currentPage + 1),
      )
      .subscribe({
        next: (words: IWord[]) => {
          this.gameWords.push(...words);
        },
        complete: () => {
          this.isWordsLoaded$.next(true);
        },
      });
  }

  getAuthorizedWords() {
    const userId = this.authService.getUserId();
    if (this.isLaunchedFromMenu) {
      const url = `users/${userId}/aggregatedWords?group=${this.englishLevel}&wordsPerPage=400`;
      this.apiService
        .get<[IAggregatedResp]>(url)
        .pipe(take(1))
        .subscribe((words: IAggregatedResp[]) => {
          this.gameWords = shuffle(words[0].paginatedResults);
          this.isWordsLoaded$.next(true);
        });
    } else {
      this.gameWords = [];
      const urls = [];
      for (let i = this.currentPage; i >= 0; i--) {
        const url = `users/${userId}/aggregatedWords?page=${i}&group=${this.englishLevel}&wordsPerPage=20`;
        urls.push(url);
      }
      of(...urls)
        .pipe(
          mergeMap((url) => this.apiService.get<[IAggregatedResp]>(url)),
          take(this.currentPage + 1),
        )
        .subscribe({
          next: (words: [IAggregatedResp]) => {
            const filtered = filterLearnedWords(words[0].paginatedResults);
            this.gameWords.push(...filtered);
          },
          complete: () => {
            this.isWordsLoaded$.next(true);
          },
        });
    }
  }

  pushCorrect(word: IWord): void {
    this.correctAnswers.push(word);
    if (this.authService.isAuth) {
      this.updateUserWords(word, true);
    }
    this.localStorageService.setLocalStorage('correctAnswers', JSON.stringify(this.correctAnswers));
  }

  pushWrong(word: IWord): void {
    this.incorrectAnswers.push(word);
    if (this.authService.isAuth) {
      this.updateUserWords(word, false);
    }
    this.localStorageService.setLocalStorage('wrongAnswers', JSON.stringify(this.incorrectAnswers));
  }

  updateUserWords(word: IWord, isWrong: boolean): void {
    this.userWords = this.authService.userWords;
    if (isContains(this.userWords, word)) {
      this.updateUserWord(word, isWrong);
    } else {
      this.createUserWord(word, isWrong);
    }
  }

  updateUserWord(word: IWord, isWrong: boolean): void {
    if (isWrong) {
      this.apiService.updateEaseWord(this.userId, word.id).subscribe((res: HardWords) => {
        this.userWords.push(res);
      });
    } else {
      this.apiService.updateHardWords(this.userId, word.id);
    }
  }

  createUserWord(word: IWord, isWrong: boolean): void {
    if (isWrong) {
      this.apiService.postWord(this.userId, word.id, 'hard').subscribe((res: HardWords) => {
        this.userWords.push(res);
      });
    } else {
      this.apiService.postWord(this.userId, word.id, 'ease').subscribe((res: HardWords) => {
        this.userWords.push(res);
      });
    }
  }

  setEnglishLevel(level: number): void {
    this.englishLevel = level.toString();
  }

  getEnglishLevel(): string {
    return this.englishLevel;
  }

  setCurrentGame(gameName: string): void {
    this.currentGame$.next(gameName);
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  setCurrentPage(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  setCorrectAnswers(answers: IWord[]): void {
    this.correctAnswers = answers;
  }

  setWrongAnswers(answers: IWord[]): void {
    this.incorrectAnswers = answers;
  }

  setGameName(gameName: string): void {
    this.localStorageService.setLocalStorage('gameName', gameName);
  }

  reset(): void {
    this.correctAnswers = [];
    this.incorrectAnswers = [];
  }

  setUserId(): void {
    this.userId = this.authService.getUserId();
  }

  setUserWords(): void {
    this.userWords = this.authService.userWords;
  }
}
